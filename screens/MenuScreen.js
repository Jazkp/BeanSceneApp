import {useState,useEffect} from "react";
import { Button } from "react-native-paper";
import { View,Text } from "react-native";
import { fetchProducts  } from "../services/apiCalls";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MenuScreen() {

  //navigation
  const navigation = useNavigation(); 
  const route = useRoute(); 
  //state
  const [table,setTable] = useState(route?.params?.table); 
  const [order,setOrder] = useState(route?.params?.order ?? {}); 
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse,setSelectedCourse] = useState(''); 
  //hooks
  useEffect(()=>{
    (async()=> {
      let products = await fetchProducts(); 
      let courses = products.flatMap(j=>j.Sittings).filter((x, i, a) => a.indexOf(x) === i); 
      setCourses(courses); 
      setProducts(products); 
    })()

  },[])


  return (
    <View>
      <View><Text>ORDER - TABLE: {table}</Text></View>
      <View style={{borderWidth:1,borderStyle:'solid',padding:5,margin:5}}>
        {courses.map(c=><Button key={c} onPress={()=>setSelectedCourse(c)}><Text>{c}</Text></Button>)}
      </View>
      {products.filter(p=>p.Sittings.indexOf(selectedCourse) > -1).map(p=><Button key={p.name}><Text>{p.name}</Text></Button>)}
    </View>
  );
}
