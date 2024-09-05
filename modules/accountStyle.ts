import { StyleSheet } from 'react-native';

//common style for log in, sign up screen
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F0E5',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Gantari-Bold',
    color: '#102C57',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#102C57',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Gantari-Bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#102C57',
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
  },
});