<template>
    <div class="login">
        <div class="row">
            <div class="col">
                <h3>Sign in!</h3>
                <h6>Not member yet?</h6>
                <!-- likt to to="/register"-->
                <form @submit.prevent="onSubmit">
                    <input  id="input-1"
                    v-model="user.email"
                    type="email"
                    placeholder="Email">
                    <input id="input-2"
                    v-model="user.password"
                    type="password"
                    placeholder="Password">
                    <button type="submit">
                        Login
                    </button>
                </form>
                <div class="row">
                    <div >
                        <!-- link to  to="/forgetpassword"-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from "../router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(async (UserData) => {
          localStorage.setItem("User", UserData.user.uid);
          const db = getFirestore();
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", UserData.user.uid));
          getDocs(q)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const user = doc.data();
                if (user) {
                  if (user.isAdmin === "true") {
                    router.push({
                      name: "Dash",
                    });
                  } else {
                    router.push({
                      name: "home",
                    });
                  }
                }
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>