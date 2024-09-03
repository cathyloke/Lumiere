import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E5',
    padding: 5,
    flexDirection: 'row',
    flexGrow: 1,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor:'#EADBC8',
  },
  sidebar: {
    width: 70,
    backgroundColor: '#F8F0E5',
    paddingVertical: 15,
    borderRightWidth: 2,
    borderColor: '#DAC0A3',
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth:2,
    borderColor:'#DAC0A3',
    height: 100,
  },
  sidebarIcon: {
    marginBottom: 10,
  },
  sidebarText: {
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
    paddingTop:7,
    color:'#102C57',
  },
  content: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    backgroundColor: '#EADBC8',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  imageRow: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Gantari-Bold',
    color:'#102C57',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Gantari-Regular',
    color: '#102C57',
    marginTop: 10,
  },
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderColor:'#DAC0A3',
    borderWidth:5,
    borderRadius:30,
  },
  detailTitle: {
    fontSize: 24,
    fontFamily: 'Gantari-Regular',
    textAlign: 'center',
    color:'#102C57',
    marginTop: 20,
  },
  detailPrice: {
    fontSize: 20,
    fontFamily: 'Gantari-Bold',
    textAlign: 'center',
    color: '#102C57',
    marginTop: 5,
  },
  detailDescription: {
    fontSize: 18,
    fontFamily: 'Gantari-Regular',
    textAlign: 'center',
    color: '#102C57',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 10,
    backgroundColor: '#DAC0A3',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
});