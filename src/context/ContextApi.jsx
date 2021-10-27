import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import app, { db } from "../config";
import { collection, doc, getDoc, getDocs, query } from "@firebase/firestore";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const [companyDetails, setCompanyDetails] = useState({
    email: "",
    contactNumber: "",
    contactNumber2: "",
    facebook: "",
    instagram: "",
    website: "",
    address: "",
    twitter: "",
    name: "",
    shortAbout: "",
    bigheading1: "",
    bigheading2: "",
    copyrightYear: "",
  });
  const [stats, setStats] = useState({
    url: "",
    ref: "",
    content: "",
    heading1: "",
    count1: "",
    description1: "",
    heading2: "",
    count2: "",
    description2: "",
    heading3: "",
    count3: "",
    description3: "",
    heading4: "",
    count4: "",
    description4: "",
  });

  const auth = getAuth();

  useEffect(() => {
    setUser(getAuth().currentUser);
  }, []);

  useEffect(() => {
    getImages();

    getCompanyDetails();
    getPosts();
    getClients();
    getStats();
    getTestimonials();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // console.log("Signed Out");
        setCurrentUser(null);
      }
    });
  }, [user]);

  const signIn = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setCurrentUser(auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const resetPassword = (auth, email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const logout = () => {
    auth.signOut().then(() => {
      alert("Logged Out");
      setUser(null);
    });
  };
  const getImages = async () => {
    const q = query(collection(db, "carousels"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((image) => {
      setAllImages((allImages) => [
        ...allImages,
        { url: image.data().url, ref: image.data().ref, id: image.id },
      ]);
    });
  };

  const getCompanyDetails = async () => {
    const docRef = doc(db, "company-profile", "profile");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setCompanyDetails(docSnap.data());
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  };
  const getPosts = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    setAllPosts([]);
    querySnapshot.forEach((post) => {
      setAllPosts((allPosts) => [...allPosts, { ...post.data(), id: post.id }]);
    });
  };
  const getTestimonials = async () => {
    setAllTestimonials([]);
    const q = query(collection(db, "testimonials"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((testimonial) => {
      setAllTestimonials((allTestimonials) => [
        ...allTestimonials,
        { ...testimonial.data(), id: testimonial.id },
      ]);
    });
  };
  const getClients = async () => {
    setAllClients([]);
    const q = query(collection(db, "clients"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((post) => {
      setAllClients((allClients) => [
        ...allClients,
        { ...post.data(), id: post.id },
      ]);
    });
  };
  const getStats = async () => {
    const docRef = doc(db, "company-stats", "stats");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setStats(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        signIn,
        currentUser,
        resetPassword,
        companyDetails,
        getCompanyDetails,
        allPosts,
        getPosts,
        setAllPosts,
        setAllClients,
        getClients,
        allClients,
        stats,
        getStats,
        setAllTestimonials,
        allTestimonials,
        getTestimonials,
        loading,
        allImages,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
