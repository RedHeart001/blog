## Context

1. ### 使用前的考虑

   Context用于在一个树形结构的组件中，共享一些“**全局**”的数据，这样就可以规避props层层传递带来的困扰。但是在使用之前，我们必须要考虑Context引发的**组件复用性问题**。

   1. 组件层级嵌套很深的情况

      ```js
      <Page user={user} avatarSize={avatarSize} />
      // ... 渲染出 ...
      <PageLayout user={user} avatarSize={avatarSize} />
      // ... 渲染出 ...
      <NavigationBar user={user} avatarSize={avatarSize} />
      // ... 渲染出 ...
      <Link href={user.permalink}>
        <Avatar user={user} size={avatarSize} />
      </Link>
      ```

      像这种只有某个嵌套层级很深的组件需要属性的情况，可以直接传递组件，就像这样：

      ```js
      function Page(props) {
        const user = props.user;
        const userLink = (
          <Link href={user.permalink}>
            <Avatar user={user} size={props.avatarSize} />
          </Link>
        );
        return <PageLayout userLink={userLink} />;
      }
      
      // 现在，我们有这样的组件：
      <Page user={user} avatarSize={avatarSize} />
      // ... 渲染出 ...
      <PageLayout userLink={...} />
      // ... 渲染出 ...
      <NavigationBar userLink={...} />
      // ... 渲染出 ...
      {props.userLink}
      ```

      甚至再进一步，利用`props.children`（类似于`Vue`的`slot`），和组合的方式重构这个组件：

      ```js
      function Page(props) {
        const user = props.user;
        const userLink = () => {
        	return (
              <Link href={user.permalink}>
                <Avatar user={user} size={props.avatarSize} />
              </Link>
        	)
        };
        return (
            <PageLayout >
              <NavigationBar>
                  {userLink}
              </NavigationBar>
            </PageLayout>
        );
      }
      ```

      这种也就是render props

2. ### 实际使用

   基本使用：

   ```js
   // Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
   // 为当前的 theme 创建一个 context（“light”为默认值）。
   const ThemeContext = React.createContext('light');
   class App extends React.Component {
     render() {
       // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
       // 无论多深，任何组件都能读取这个值。
       // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
       return (
         <ThemeContext.Provider value="dark">
           <Toolbar />
         </ThemeContext.Provider>
       );
     }
   }
   
   // 中间的组件再也不必指明往下传递 theme 了。
   function Toolbar() {
     return (
       <div>
         <ThemedButton />
       </div>
     );
   }
   
   class ThemedButton extends React.Component {
     // 指定 contextType 读取当前的 theme context。
     // React 会往上找到最近的 theme Provider，然后使用它的值。
     // 在这个例子中，当前的 theme 值为 “dark”。
     static contextType = ThemeContext;
     render() {
       return <Button theme={this.context} />;
     }
   }
   ```

   动态用法：

   `theme-context.js`

   ```js
   import React from 'react';
   const themes = {
       light: {
           foreground: '#000000',
           background: '#eeeeee',
       },
       dark: {
           foreground: '#ffffff',
           background: '#222222',
       },
   };
   // 创建一个公共Context对象
   const ThemeContext = React.createContext({
       theme: themes.dark, // 默认值
       toggleTheme: () => { }    // 一个构造
   });
   ThemeContext.displayName = 'MyContext';
   export { ThemeContext, themes };
   ```

   `ThemeTogglerButton.js`

   ```js
   import React from 'react';
   import { ThemeContext } from './theme-context';
   
   function ThemedButton() {
       return (
           // Context数据接收者，function以这种形式使用，class中指定类组件的contextType
           <ThemeContext.Consumer>
               {
                   ({ theme, toggleTheme }) => {
                       console.log(theme);
                       return (
                           <button
                               onClick={toggleTheme}
                               style={{ 'backgroundColor': theme.background }}
                           >
                               changeTheme
                           </button>
                       )
                   }
               }
           </ThemeContext.Consumer>
       );
   }
   
   export default ThemedButton;
   ```

   `app.js`

   ```js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { ThemeContext, themes } from './theme-context';
   import ThemeTogglerButton from './ThemeTogglerButton'
   
   class App extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               theme: themes.light,
               toggleTheme: () => {
                   this.setState(state => ({
                       theme:
                           state.theme === themes.dark
                               ? themes.light
                               : themes.dark,
                   }))
   
               }
           }
   
   
       }
       render() {
           // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
           // 而外部的组件使用默认的 theme 值
           return (
               <div>
                   <ThemeContext.Provider value={this.state}>
                       {/* <Toolbar changeTheme={this.toggleTheme} /> */}
                       <ThemeTogglerButton />
                   </ThemeContext.Provider>
               </div>
           );
       }
   }
   
   App.contextType = ThemeContext;
   
   ReactDOM.render(<App />, document.getElementById('root'));
   ```

   不论是Consumer还是`contextType`，他们都是从最近的Provider中取值