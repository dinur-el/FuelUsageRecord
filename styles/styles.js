import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',  
        marginBottom: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
        width: '90%',  
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
        
    },
    listItem: {
        backgroundColor: 'white',
        marginTop: 15 ,
        padding: 10,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    flatList: {
        width: '90%',  
    },
    rmvBtn:{
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        paddding: 5,
        backgroundColor: '#0782F9',
    }
});