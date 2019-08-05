import React from 'react' ;
import { 
    Image,
    Platform 
} from 'react-native';
import shorthash from 'shorthash';
import RNFS from 'react-native-fs';


// tuto de donde saque el ejemplo
//https://medium.com/@piyushgupta_81472/caching-images-react-native-96266cdc4c2f

class CacheImage extends React.Component {

    state = {
        source:null
    }

    loadFile = ( path )=> {
        this.setState({ source:{uri:path}}) ;
    }
    
    downloadFile = (uri,path) => {

        RNFS.downloadFile({fromUrl:uri, toFile: path}).promise
            .then(res =>this.loadFile(path));
    }

    componentDidMount(){

        const { uri } = this.props ; 
        const name = shorthash.unique(uri);
        const extension =  uri.split('.').pop();  
        const prefix = (Platform.OS === 'android') ? 'file://' : '';        
        const path =`${prefix}${RNFS.CachesDirectoryPath}/${name}.${extension}`;
        
        RNFS.exists(path).then( exists => {
            if(exists)this.loadFile(path) ;
            else this.downloadFile(uri,path) ;
        })

    }
  
    render(){
        return(
            <Image style={this.props.style} source={this.state.source} />
        );
    }

}

export default CacheImage ;