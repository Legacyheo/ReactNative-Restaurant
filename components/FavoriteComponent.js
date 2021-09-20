// redux
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/ActionCreators';
import { isThisSecond } from 'date-fns';
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
};
const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, LogBox } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';

import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class Favorites extends Component {
    render() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (this.props.dishes.isLoading) {
            return (<Loading />);
        } else if (this.props.dishes.errMess) {
            return (<Text>{this.props.dishes.errMess}</Text>);
        } else {
            const dishes = this.props.dishes.dishes.filter((dish) => this.props.favorites.some((el) => el === dish.id));
            return (
                <SwipeListView
                    useFlatList={true}
                    data={dishes}
                    renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
                    renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                    keyExtractor={item => item.id}
                    stopLeftSwipe={1}
                    rightOpenValue={-75}
                >
                </SwipeListView>
            );
        }
    }
    renderMenuItem(item, index) {
        const { navigate } = this.props.navigation;
        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>
                <ListItem key={index} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                    <Avatar source={{ uri: baseUrl + item.image }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Animatable.View>

        );
    };

    renderHiddenItem(item, index) {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete this favorite dish ?',
                            [
                                { text: 'Cancel', onPress: () => { /* nothing */ } },
                                { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
                            ],
                            { cancelable: false }
                        );
                    }
                    }
                >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);