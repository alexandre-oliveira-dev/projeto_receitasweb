import React from "react";

type TitleFypes = {
    level: "400"| "600"| "800";
    title: string;
    color: string;
    size: string;
    shadow?:boolean;
    width?: string,
    margin?:string
};

export default function Title({color,level,size,title,shadow,width,margin}:TitleFypes) {
  return <div style={{
    width:'100%',
    height:"50px",
    display:"flex",
    justifyContent:'center',
    alignItems:"center",
    margin:margin
  }}>
    <h1 style={{
        width:width,
        fontWeight:Number(level),
        color:color,
        fontSize:size,
        textShadow: shadow ? '5px 5px 10px black' : 'none',
        textAlign:"center"
    }}>{title}</h1>
  </div>;
}
