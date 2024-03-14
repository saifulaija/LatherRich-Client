import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";


const NewApp = () => {
    return (
        <>
          <ProtectedRoute role={undefined}>
            <AdminLayout/>
            </ProtectedRoute>  
        </>
    );
};

export default NewApp;