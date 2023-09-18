import { useEffect, useState, useCallback, useMemo } from 'react';
import { Text, View, StyleSheet, SectionList, SafeAreaView, Alert, Dimensions, Image, BackHandler } from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories } from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['starters', 'mains', 'desserts'];

const Item = ({ title, price, desc, image }) => (

    <View style={styles.item}>
        <View style={{ flex: 1 }} >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.price}>${price}</Text>
        </View>
        <Image style={{ width: width * .35, height: height * .15, marginLeft: 5 }}
            source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/' + image + '?raw=true' }} />
    </View>
);

export default function Home() {
    BackHandler.addEventListener('hardwareBackPress', function () {
        BackHandler.exitApp();
    });
    var menuItems;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            const result = json.menu
            return result
        } catch (e) {
            Alert.alert(e.message);
        }
    }


    useEffect(() => {
        (async () => {
            try {
                await createTable();
                menuItems = await getMenuItems();
                if (!menuItems.length) {
                    console.log("HERE")
                    menuItems = await fetchData();
                    saveMenuItems(menuItems);
                }
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
                setLoading(false);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [loading]);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                // If all filters are deselected, all categories are active
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={styles.conatiner} >
                <Text style={styles.heading} >
                    Little Lemon
                </Text>
                <View style={styles.subcontainer} >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.subheading} >
                            Chicago
                        </Text>
                        <Text style={styles.description} >
                            We are a family owned Mediterranean restaurant,
                            focused on traditional recipes served with a modern twist.
                        </Text>
                    </View>
                    <Image source={require('../assets/src1.png')} style={styles.image} />
                </View>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="black"
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={styles.searchBar}
                    iconColor="black"
                    inputStyle={{ color: 'black' }}
                    elevation={10}
                />
            </View>
            <Text style={styles.order} >ORDER FOR DELIVERY!</Text>
            <Filters
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
                keyExtractor={(item) => item.index}
            />
            {!loading && <SectionList
                style={styles.sectionList}
                sections={data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Item title={item.name} price={item.price} desc={item.desc} image={item.image} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}

            />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    conatiner: {
        backgroundColor: "#495e57",
        marginBottom: 10,
    },
    heading: {
        color: '#f9d112',
        fontSize: 40,
        paddingLeft: 10,
        paddingTop: 10,
    },
    subheading: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 10
    },
    subcontainer: {
        flexDirection: 'row'
    },
    description: {
        color: 'white',
        margin: 10,
        fontSize: 17
    },
    image: {
        width: width * .4,
        height: height * .2,
        margin: 10,
        flex: 1,
        borderRadius: 20
    },
    sectionList: {
        paddingHorizontal: 16,
    },
    searchBar: {
        marginBottom: 24,
        backgroundColor: 'white',
        shadowRadius: 0,
        shadowOpacity: 0,
        marginRight: 10,
        marginLeft: 10
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        width: width * .95,
        flex: 1,

    },
    header: {
        fontSize: 24,
        paddingVertical: 8,
        color: '#495E57',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 23,
        color: 'black',
        fontWeight: "bold"
    },
    desc: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        color: 'grey',
    },
    price: {
        fontSize: 20,
        color: '#495E57',
        fontWeight: "bold"
    },
    order: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * .06,
        margin: 10
    }
});
