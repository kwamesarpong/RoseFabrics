import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";


const  SidebarCats = ({name, handleClick}) => (
    <TouchableOpacity onPress={() =>handleClick(name)} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:40}}>
        <Image source={require('../category.png')} />
        <Text style={{paddingLeft:40}}>{name}</Text>
    </TouchableOpacity>
)

export default SidebarCats;
