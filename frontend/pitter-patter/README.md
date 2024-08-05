# dir 설명

### assets
img file 등 필요한 assets
예: `/img/logo/logo.png`

### components
사이트 전역에서 공통으로 필요한 컴포넌트들
예: NavBar 등

### pages
페이지 디자인
폴더 내 css 파일: 해당 페이지에만 사용되는 css, import main.css 필수

### styles
사이트 전역에서 공통으로 필요한 css들

#### main.css: import용 css
#### _theme.css: colors
#### _layout.css: for layout (display 등)



```
pitter-patter
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ AddImage.png
│  │  │  ├─ ArrowLeft.png
│  │  │  ├─ backArrow.png
│  │  │  ├─ BackSpace.png
│  │  │  ├─ ChevronLeft.png
│  │  │  ├─ ChevronRight.png
│  │  │  ├─ Done.png
│  │  │  ├─ Menu.png
│  │  │  ├─ PlusSquare.png
│  │  │  ├─ star.png
│  │  │  ├─ Undone.png
│  │  │  ├─ User.png
│  │  │  ├─ warningSign.png
│  │  │  └─ X.png
│  │  └─ img
│  │     ├─ Attendance
│  │     │  └─ attendance-background.png
│  │     ├─ Background
│  │     │  ├─ Landing.png
│  │     │  ├─ Plaid.png
│  │     │  └─ YellowWave.png
│  │     ├─ Error
│  │     │  └─ error.png
│  │     ├─ Game
│  │     │  └─ vs.png
│  │     ├─ Landing
│  │     │  └─ home.png
│  │     ├─ logo
│  │     │  ├─ kakao.png
│  │     │  ├─ logo.png
│  │     │  ├─ naver.png
│  │     │  ├─ previewForLogo.png
│  │     │  └─ X.png
│  │     ├─ NavBar
│  │     │  ├─ toGame.png
│  │     │  ├─ toMarket.png
│  │     │  ├─ toMypage.png
│  │     │  └─ toRanking.png
│  │     ├─ Rank
│  │     │  └─ Trophy.png
│  │     ├─ Shop
│  │     │  ├─ frame
│  │     │  │  ├─ example.png
│  │     │  │  ├─ frame1.png
│  │     │  │  ├─ frame2.png
│  │     │  │  ├─ frame3.png
│  │     │  │  └─ frame4.png
│  │     │  └─ wallpaper
│  │     │     ├─ background1.png
│  │     │     ├─ background2.png
│  │     │     ├─ background3.png
│  │     │     ├─ background4.png
│  │     │     └─ background5.png
│  │     ├─ Snapshot
│  │     │  ├─ eg1.png
│  │     │  ├─ eg2.png
│  │     │  ├─ eg3.png
│  │     │  ├─ eg4.png
│  │     │  ├─ save.png
│  │     │  └─ share.png
│  │     └─ User
│  │        ├─ SingingBanana.png
│  │        └─ userdelete.png
│  ├─ components
│  │  ├─ component.css
│  │  ├─ modal
│  │  │  ├─ InputH.jsx
│  │  │  ├─ IsReady.jsx
│  │  │  └─ modal.css
│  │  ├─ NavBar.jsx
│  │  └─ ProfileList.jsx
│  ├─ index.jsx
│  ├─ pages
│  │  ├─ Child
│  │  │  ├─ BMIGraph.jsx
│  │  │  ├─ BMIGraphStyle.jsx
│  │  │  ├─ ChildActivityTable.jsx
│  │  │  ├─ ChildActivityTableStyle.jsx
│  │  │  ├─ ChildPage.jsx
│  │  │  ├─ ChildPageStyle.jsx
│  │  │  ├─ ChildPhysicalInfo.jsx
│  │  │  └─ ChildPhysicalInfoStyle.jsx
│  │  ├─ Error.jsx
│  │  ├─ ETC
│  │  │  ├─ Attendance
│  │  │  │  ├─ Attendance.jsx
│  │  │  │  ├─ AttendanceEvent.jsx
│  │  │  │  ├─ AttendanceEventStyle.jsx
│  │  │  │  ├─ AttendanceStyle.jsx
│  │  │  │  ├─ CalendarPage.jsx
│  │  │  │  └─ CalendarStyle.jsx
│  │  │  └─ Rank
│  │  │     ├─ Rank.jsx
│  │  │     └─ RankStyle.jsx
│  │  ├─ Game
│  │  │  ├─ GamePage.jsx
│  │  │  ├─ GamePageMulti.jsx
│  │  │  ├─ GamePageMultiStyle.jsx
│  │  │  ├─ GamePageStyle.jsx
│  │  │  ├─ SelectMode.jsx
│  │  │  ├─ SelectModeStyle.jsx
│  │  │  └─ Snapshot
│  │  │     ├─ Snapshot.jsx
│  │  │     ├─ SnapshotResult.jsx
│  │  │     └─ SnapshotStyle.jsx
│  │  ├─ LandingPage
│  │  │  ├─ Header.jsx
│  │  │  ├─ LandingPage.jsx
│  │  │  ├─ LandingPageStyle.jsx
│  │  │  ├─ MenuModal.jsx
│  │  │  └─ ProfileModal.jsx
│  │  ├─ Shop
│  │  │  ├─ Shop.jsx
│  │  │  ├─ ShopStyle.jsx
│  │  │  ├─ SnapshotShop.jsx
│  │  │  ├─ SnapshotShopStyle.jsx
│  │  │  ├─ WallpaperShop.jsx
│  │  │  └─ WallpaperShopStyle.jsx
│  │  └─ User
│  │     ├─ Auth
│  │     │  ├─ Login.jsx
│  │     │  ├─ LoginStyle.jsx
│  │     │  ├─ SignUp.jsx
│  │     │  └─ SignUpStyle.jsx
│  │     ├─ MyPage
│  │     │  ├─ ChangePassword.jsx
│  │     │  ├─ DeleteUser.jsx
│  │     │  ├─ MyPage.jsx
│  │     │  ├─ MyPageStyle.jsx
│  │     │  ├─ UserInfo.jsx
│  │     │  └─ UserInfoStyle.jsx
│  │     ├─ SelectProfile.jsx
│  │     ├─ SelectProfileStyle.jsx
│  │     └─ SFA
│  │        ├─ ForgotPWmodal.jsx
│  │        ├─ ForgotPWmodalStyle.jsx
│  │        ├─ SFA.jsx
│  │        └─ SFAStyle.jsx
│  ├─ redux
│  │  └─ store.js
│  └─ style
│     ├─ main.css
│     ├─ _component.css
│     ├─ _layout.css
│     └─ _theme.css
└─ vite.config.js

```