import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { AnonimousRoute } from "../Components/AnonimousRoute";
import { UserRoute } from "../Components/UserRoute";
import { BasePage } from "./BasePage/BasePage";
import { SignIn } from "./SignIn/SignIn";
import { SignUpGeneralInfo } from "./SignUp/GeneralInfo";
import { SignUpAddress } from "./SignUp/Address";
import { SignUpAccount } from "./SignUp/Account";
import { SignUpSuccess } from "./SignUp/Success";
import { MenuRegisterInfo } from "./Menu/Register/Info/MenuRegisterInfo";
import { MenuRegisterSuccess } from "./Menu/Register/Success/MenuRegisterSuccess";
import { MenuEditInfo } from "./Menu/Edit/Info/MenuEditInfo";
import { MenuItemEdit } from "./Menu/Edit/Item/MenuItemEdit";
import { TablesRegister } from "./Tables/Register";
import { ViewQRCode } from "./ViewQRCode/ViewQRCode";
import { MenuItemRegister } from "./Menu/ItemRegister";
import { Profile } from "./Profile/Profile";
import { OrdersList } from "./OrdersList/OrdersList";
import { OrderView } from "./Order/View/OrderView";
import { MenuView } from "./Menu/View/MenuView";
import { OrderCart } from "./Order/Cart/OrderCart";
import { OrderItem } from "./Order/Item/OrderItem";
import { OrderSuccess } from "./Order/Success/OrderSuccess";
import { EditPersonalInfo } from "./EditPersonalInfo/EditPersonalInfo";
import { EditAddress } from "./EditAddress/EditAddress";
import { MenuItemNew } from "./Menu/Edit/New/MenuItemNew";

export function Routes() {
    return (
        <BasePage>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from="/" to="/signin" />
                    <Redirect
                        exact
                        from="/signup"
                        to="/signup/info"
                    />
                    <AnonimousRoute
                        exact
                        path="/signin"
                        component={SignIn}
                    />
                    <AnonimousRoute
                        exact
                        path="/signup/info"
                        component={SignUpGeneralInfo}
                    />
                    <AnonimousRoute
                        exact
                        path="/signup/address"
                        component={SignUpAddress}
                    />
                    <AnonimousRoute
                        exact
                        path="/signup/account"
                        component={SignUpAccount}
                    />
                    <Route
                        path="/signup/success"
                        component={SignUpSuccess}
                    />
                    <AnonimousRoute
                        exact
                        path="/table/:tableId/cart"
                        component={OrderCart}
                    />
                    <AnonimousRoute
                        exact
                        path="/table/:tableId/item/:itemId"
                        component={OrderItem}
                    />
                    <AnonimousRoute
                        exact
                        path="/table/:tableId/success"
                        component={OrderSuccess}
                    />
                    <AnonimousRoute
                        exact
                        path="/table/:tableId"
                        component={MenuView}
                    />
                    <UserRoute
                        exact
                        path="/qrcode"
                        component={ViewQRCode}
                    />
                    <UserRoute
                        exact
                        path="/menu/new"
                        component={MenuItemNew}
                    />
                    <UserRoute
                        exact
                        path="/menu/edit"
                        component={MenuEditInfo}
                    />
                    <UserRoute
                        exact
                        path="/menu/edit/:id"
                        component={MenuItemEdit}
                    />
                    <UserRoute
                        exact
                        path="/menu/register"
                        component={MenuRegisterInfo}
                    />
                    <UserRoute
                        exact
                        path="/menu/register/item"
                        component={MenuItemRegister}
                    />
                    <UserRoute
                        exact
                        path="/menu/register/success"
                        component={MenuRegisterSuccess}
                    />
                    <UserRoute
                        exact
                        path="/menu"
                        component={MenuView}
                    />
                    <UserRoute
                        exact
                        path="/tables/register"
                        component={TablesRegister}
                    />
                    <UserRoute
                        exact
                        path="/tables/edit"
                        component={TablesRegister}
                    />
                    <UserRoute
                        exact
                        path="/orders"
                        component={OrdersList}
                    />
                    <UserRoute
                        exact
                        path="/order/:id"
                        component={OrderView}
                    />
                    <UserRoute
                        exact
                        path="/profile/info"
                        component={EditPersonalInfo}
                    />
                    <UserRoute
                        exact
                        path="/profile/address"
                        component={EditAddress}
                    />
                    <UserRoute
                        exact
                        path="/profile"
                        component={Profile}
                    />
                </Switch>
            </BrowserRouter>
        </BasePage>
    );
}
