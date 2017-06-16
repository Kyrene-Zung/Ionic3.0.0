import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GuidePage } from '../pages/guide/guide';
import { FriendPage } from '../pages/friend/friend';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage} from '../pages/friend/chat';
import { CommandPage} from '../pages/friend/command';
import { LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/login/register';
import { PersonPage} from '../pages/contact/person';
import { ChangecodePage} from '../pages/contact/changecode';
import { ExpressbookPage} from '../pages/contact/expressbook';
import { MyexpressPage} from '../pages/contact/myexpress';
import { ConcernPage} from '../pages/contact/concern';
import { BookstorePage} from '../pages/contact/bookstore';
import { MycommandPage} from '../pages/contact/mycommand';
import { KnowaboutPage } from '../pages/slidemenu/knowabout';
import { MycollectionPage } from '../pages/slidemenu/mycollection';
import { PresonalPage } from '../pages/slidemenu/presonal';
import { SettingPage } from '../pages/slidemenu/setting';
import { NewsremindPage } from '../pages/slidemenu/newsremind';
import { DndPage } from '../pages/slidemenu/dnd';
import { PrivacyPage } from '../pages/slidemenu/privacy';
import { RegularPage } from '../pages/slidemenu/regular';
import { AboutPage } from '../pages/slidemenu/about';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FriendPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage,
    LoginPage,
    ChatPage,
    CommandPage,
    PersonPage,
    ChangecodePage,
    ExpressbookPage,
    MyexpressPage,
    GuidePage,
    ConcernPage,
    BookstorePage,
    MycommandPage,
    KnowaboutPage,
    MycollectionPage,
    PresonalPage,
    SettingPage,
    NewsremindPage,
    DndPage,
    PrivacyPage,
    RegularPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FriendPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ChatPage,
    CommandPage,
    PersonPage,
    ChangecodePage,
    ExpressbookPage,
    MyexpressPage,
    GuidePage,
    ConcernPage,
    BookstorePage,
    MycommandPage,
    KnowaboutPage,
    MycollectionPage,
    PresonalPage,
    SettingPage,
    NewsremindPage,
    DndPage,
    PrivacyPage,
    RegularPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
