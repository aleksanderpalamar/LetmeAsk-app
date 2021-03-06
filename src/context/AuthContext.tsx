import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => void;
  singOutWithGoogle: () => void;
  singInWithTwitter: () => void;
  singOutWithTwitter: () => void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  function singOutWithGoogle() {
    firebase.auth().signOut()
  .then(function() {
    console.log('Logout');
  }, function(error) {
    console.error( error );
  });
  }

  function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();   
    
    auth.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }     
    })  
  }

  function singOutWithTwitter() {
    firebase.auth().signOut()
  .then(function() {
    console.log('Logout');
  }, function(error) {
    console.error( error );
  });
  }

  function singInWithTwitter() {
    const provider2 = new firebase.auth.TwitterAuthProvider();

    auth.signInWithPopup(provider2).then(result => {
      if (result.user) {
        const { uid, displayName, photoURL } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Twitter Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  }

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle, singOutWithGoogle, singInWithTwitter, singOutWithTwitter }}>
      {props.children}
    </AuthContext.Provider>
  );
}