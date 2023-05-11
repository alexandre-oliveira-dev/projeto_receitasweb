import firebase from "../../services/firebase";

type RegisterCredencials = {
  name: string;
  email: string;
  password: string;
};

export async function Register({ email, name, password }: RegisterCredencials) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (value) => {
      await firebase.firestore().collection("users").doc(value.user?.uid).set({
        name: name,
        email: email,
        password: password,
      });
    });
}

export async function Login(email: string, password: string) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((value) => {
      localStorage.setItem("@receitasweb", JSON.stringify(value));

      window.location.href='/'

    })
    .catch((err)=>{
        console.log(err)
    })

}

