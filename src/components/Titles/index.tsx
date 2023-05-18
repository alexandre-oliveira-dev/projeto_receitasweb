import React from "react";

type TitleFypes = {
    level: "400"| "600"| "800";
    title: string;
    color: string;
    size: string;
    shadow?:boolean;
    width?: string,
    margin?:string,
    align?:'start'|'center'|'left'|'right' 
};

export default function Title({color,level,size,title,shadow,width,margin,align}:TitleFypes) {
  return <div style={{
    width:'100%',
    height:"80px",
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
        textAlign:align
    }}>{title}</h1>
  </div>;
}
