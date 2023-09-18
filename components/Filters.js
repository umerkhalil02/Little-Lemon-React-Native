import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: selections[index] ? '#f9d112' : '#D3D3D3',
            borderWidth: 1,
            borderColor: 'white',
            borderRadius:30
          }}>
          <View>
            <Text style={{ color: '#495E57',fontWeight:'bold'}}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Filters;
