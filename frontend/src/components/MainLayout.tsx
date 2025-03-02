import {Outlet} from "react-router";
import Nav from "./Nav.tsx";
import MainScene from "./MainScene.tsx";
import Footer from "./Footer.tsx";


export default function MainLayout() {
    return (
        <div className="relative">
            <Nav/>
            <div className="h-14"></div>
            <MainScene/>
            <main className="max-w-xl ml-auto mr-auto px-8 py-6 min-h-screen">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )

}