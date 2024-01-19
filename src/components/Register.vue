<template>
    <div class="register">
        <div class="row">
            <div class="col">
                <div>
                    <h3>Sign Up!</h3>
                    <h6>Are you a member?</h6>
                    <button>
                        Sign in Now
                    </button>
                </div>
                <form>
                    <input id="username" v-model="user.username" type="text"  required>
                    <input id="email" v-model="user.email" type="email"  placeholder="Email" required>
                    <input id="password" v-model="user.password" type="password" placeholder="Password" required>
                    <input  id="tel" v-model="user.tel" type="number" placeholder="Phone Number" required>
                    <input id="address" v-model="user.address" type="text" placeholder="Address" >
                    <button  type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import router from "../router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        address: "",
        tel: "",
        email: "",
        password: "",
        uid: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const db = getFirestore(),
        auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        this.user.email,
        this.user.password
      ).then((UserData) => {
        const userRef = doc(db, "users", UserData.user.uid);
        setDoc(userRef, {
          username: this.user.username,
          address: this.user.address,
          tel: this.user.tel,
          email: this.user.email,
          password: this.user.password,
          uid: UserData.user.uid,
          isAdmin: false,
        })
          .then(() => {
            localStorage.setItem("User", UserData.user.uid);
            router.push({ name: "HomeUser" }).catch((error) => {
              console.log("error manajemch");
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>