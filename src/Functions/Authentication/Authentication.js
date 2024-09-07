
import {auth, db} from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePhoneNumber, signOut } from "firebase/auth";
import { set, ref, get, update } from "firebase/database"

export const LognInAuth = async (email, password, setWhichRole) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = await ListUser(user.uid, setWhichRole);
 
    if (userData) {

      localStorage.setItem("Token", await user.getIdToken());
      localStorage.setItem("DisplayName", userData.name);  
    }

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; 
  }
};

export const SignInAuth = async (datos) => {
 return  createUserWithEmailAndPassword(auth, datos.email, datos.password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      await SaveUser(datos, user.uid);

    })
    .catch((error) => {
      console.error('Error al crear la cuenta:', error);
    });
};

export const ListUser = (userId, setWhichRole) => {

  const userRef = ref(db, `Users/${userId}`)

  return get(userRef)

    .then((snapshot) => {

      if (snapshot.exists()) {

        const user = snapshot.val()
        setWhichRole(user.role)
        return user


      } else {

        console.log('No data available for this user.');
        return null;

      }
    })

    .catch((error) => {

      console.error('Error reading user data:', error);
      return null;

    });
}

export const ListAllUsers = (setListAllUser) => {
  const usersRef = ref(db, 'Users');

  return get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usersObject = snapshot.val();
        const usersList = Object.keys(usersObject).map(key => ({
          id: key,
          ...usersObject[key]
        }));
        setListAllUser(usersList); // Asigna la lista de usuarios con sus IDs
      } else {
        console.log('No data available for users.');
        setUsersList([]); // Devuelve una lista vacía si no hay usuarios
      }
    })
    .catch((error) => {
      console.error('Error reading users data:', error);
      setUsersList([]); // Devuelve una lista vacía en caso de error
    });
};

const SaveUser = (datos, userId) => {

  set(ref(db, `Users/${userId}`), datos)

    .then(() => {

    })

    .catch((error) => {

      console.error("Error al guardar los datos: ", error);

    });
}

export const updateUserRole = async (userId, newRole, setListAllUser) => {

  const userRef = ref(db, `Users/${userId}`);
    try {
        await update(userRef, { role: newRole });
        console.log(" updated successfully");
        ListAllUsers(setListAllUser)
    } catch (error) {
        console.error("Error updating :", error);
    }
}

export const logout = async () => {

  await signOut(auth)

  localStorage.clear()
  window.location.reload();

}