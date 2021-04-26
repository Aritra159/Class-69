import React from 'react';
import {Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeSanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions : null,
            scanned : false,
            scannedData : '',
            buttonState : 'normal'
        }
        
    }
    getCameraPermissions=async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked',
            scanned : false
        })
    }
    handleBarCodeScan=async ({type,data})=> {
        this.setState({scanned:true, scannedData: data, buttonState: 'normal'})
    }

    render(){
        const hasCamerapermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const  buttonState = this.state.buttonState
        if (buttonState==='clicked'&& hasCamerapermissions){
            return(
                <BarCodeSanner onBarCodeScanned={scanned ? undefined:this.handleBarCodeScan} /> 
            )
        } else if (buttonState==='normal'){
            return(
                <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.displayText}>
                    {hasCamerapermissions=== true ? this.state.scannedData : 'request camera permissions'} 
                </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions }>
                    <Text style={styles.buttonText}> Scan the QR Code </Text>
                 </TouchableOpacity>   
            </View>
            )
        }
    }
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
 displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
 scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 },
 buttonText:{ fontSize: 20, } });