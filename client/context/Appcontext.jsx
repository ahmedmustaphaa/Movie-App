import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom'; // ← تأكد أنك تستخدم react-router-dom وليس react-router
import toast from 'react-hot-toast';

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Appcontext({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate(); 
 const location=useLocation()
  const fetchIsAdmin = async () => {
    try {
      if (!user) return;

      const token = await getToken();
      const { data } = await axios.get('/api/admin/is-admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(!data.isAdmin &&location.pathname.startsWith('/admin')){
        navigate('/');
        toast.error("you are not authorizeed to access admin dashboard")
      }

      setIsAdmin(data?.isAdmin || false);
      console.log('isAdmin:', data);
    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  };

  const getFavorites=async (req,res)=>{
    try{

      const token=await getToken();
      const {data}=await axios.get('/api/user/get-favorite',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

     if(data.success){
     
      setFavourite(data.movies)
     }
    }catch (error) {
      console.error('Error favourite admin status:'+ + error);
    }
  }

  const fetchShow = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get('/api/show/all', {
        headers: {
          Authorization: `Bearer ${token}`, // ← إضافة التوكن لو الـ route محمي
        },
      });


      setShow(data.shows);
   
    } catch (error) {
      console.log('Error fetching shows:', error);

      console.log(error.message)
    }
  };

  useEffect(() => {
    if (user) {
      fetchIsAdmin();

    }
  }, [user]);

  useEffect(()=>{
          fetchShow();
          getFavorites()
  },[])

  const value = {
    axios,
    isAdmin,
    show,
   fetchIsAdmin,
    user,
    navigate,
    getToken,
    image_base_url,
    favourite,
    getFavorites
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const ShareContext = () => {
  return useContext(AppContext);
};

export default Appcontext;
