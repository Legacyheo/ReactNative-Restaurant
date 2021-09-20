import React, { Component } from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ margin: 10 }}>HONG KONG</Text>
                    <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
                    <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
                    <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
                    <Button title=' Send Email' buttonStyle={{ backgroundColor: '#7cc' }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail} />
                </Card>
            </Animatable.View>
        );
    }
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['hieunhandoan@gmail.com'],
            subject: 'From Confusion',
            body: 'Hello my friends ...'
        });
    }
}

export default Contact;