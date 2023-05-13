import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Title from "../../components/Titles";
import firebase from "../../services/firebase";
import { toast } from "react-toastify";

export default function PostRenevues() {

    const [ingredientes, setIngrediente] = useState('')
    const [dataingredientes, setDatangrediente] = useState<string[]>([])
    const [datauser, setDatauser] = useState<any>();
    const [title, setTitle] = useState<string>('');
    const [nivel, setNivel] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [modo, setModo] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
      const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || {};
      setDatauser(userdata?.user);
  
    }, []);


    async function FilesRegister(files:any){
      if(!datauser){
        return;
      }
      setLoad(true)
      const arquives = files.target.files
      const arrayfiles = []

      for(let i =0; i < arquives?.length; i ++){
         arrayfiles.push(arquives[i])
      }

       arrayfiles.forEach(async(item) =>{
        await firebase.storage().ref(`/files/${datauser?.uid}`).child(`${datauser?.uid}-${item.name}`).put(item)
        .then(async()=>{
          await firebase.storage().ref(`/files/${datauser?.uid}`).child(`${datauser?.uid}-${item.name}`)
          .getDownloadURL()
          .then((url) =>{
           let data:[''] = JSON.parse(localStorage.getItem('@files') as any) || []
           data.push(url)
           localStorage.setItem('@files',JSON.stringify(data))
           setLoad(false)
          })
        })
        .catch((err)=>{
          console.log(err)
          toast.error('Ops, tente novamente mais tarde!')
        })
       })
    }


    async function handleformrenevues(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!datauser){
          return;
        }
        if(!title || !modo || !dataingredientes || !tipo || !categoria || !nivel){
          return;
        }

        const banners:[''] = JSON.parse(localStorage.getItem('@files') as any) || []

        let data = {
           user:datauser?.uid,
           created_at: new Date().getDate(),
           title,
           nivel,
           categoria,
           tipo,
           banners,
           dataingredientes,
           modo
        }

        await firebase.firestore().collection('receitas').doc(`${datauser?.uid}-${title}`).set(data)
        .then(()=>{
          toast.success('Receita criada com sucesso!')
          localStorage.removeItem("@files")
        })
        .catch(()=>{
          toast.error('Ops, tente novamente mais tarde!')
        })
    }

  return (
    <div className="container-post-renevues">
      <Header></Header>
      <form className="container-form-post"onSubmit={(e)=>handleformrenevues(e)} >
        <Title
          color="coral"
          level="600"
          size="30px"
          title="Compartilhe suas melhores receitas 😋"
        ></Title>

        <div className="box-input-form">
          <input
          onChange={(e)=> setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Nome da sua receita:"
            className="inputformrenevues"
          />
          <div className="inputformringredientes">
            <input
              type="text"
              name="ingredientes"
              placeholder="ingredientes:"
              onChange={(e) => setIngrediente(e.target.value)}
              value={ingredientes}
            />
            <button type="button" onClick={()=>{
                if(!ingredientes){
                    return;
                }
                setDatangrediente([...dataingredientes,ingredientes])
                setIngrediente('')
            }}>+</button>
          </div>
          <select onChange={(e)=> setNivel(e.target.value)} className="inputformrenevues">
            <option disabled={true}>Nivel de dificuldade</option>
            <option value={'facil'}>facil</option>
            <option value={'medio'}>medio</option>
            <option value={'dificil'}>dificil</option>
          </select>
          <select onChange={(e)=> setTipo(e.target.value)} className="inputformrenevues">
            <option disabled={true}>Tipo</option>
            <option value={'doce'}>doce</option>
            <option value={'salgado'}>salgado</option>
          </select>
          <select onChange={(e)=> setCategoria(e.target.value)} className="inputformrenevues">
            <option disabled={true}>Categoria</option>
            <option value={'massas'}>massas</option>
            <option value={'carnes'}>carnes</option>
            <option value={'bebidas'}>bebidas</option>
            <option value={'sopas'}>sopas</option>
            <option value={'fitness'}>fitness</option>
            <option value={'lanches'}>lanches</option>
          </select>
            { dataingredientes.length > 0 && dataingredientes.map((item,index) => {
            return(
                <p key={index} className="ingrediente-tag">{item} 
                <button disabled={load} type="button" style={{background:"none",color:"#fff",border:"0",marginLeft:'10px'}} onClick={()=>{
                    setDatangrediente(dataingredientes.filter(ing => ing !== item))
                }}>x</button></p>
            )
          })}
          <textarea
            name="preparo"
            placeholder="Modo de preparo: "
            style={{ width: "100%", padding: "1rem", outline: "none" }}
            onChange={(e)=> setModo(e.target.value)}
          ></textarea>
          <input
          onChange={(e)=> FilesRegister(e)} type="file" multiple={true} max={2} className="inputformrenevues"></input>
          <button type="submit">Postar</button>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}
