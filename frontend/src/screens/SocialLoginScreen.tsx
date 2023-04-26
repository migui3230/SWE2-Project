
    import {
        createStyles,
        rem, 
      } from "@mantine/core";
      import React, { useEffect, useState } from "react";
      import jwt_decode from "jwt-decode";
      declare global {
        interface Window {
          google: any;
          FB: any;
          fb: any;
        }
      };
      // styles for the page
      const useStyles = createStyles((theme) => ({
        
        wrapper: {
          minHeight: 400,
          boxSizing: "border-box",
          backgroundImage: `linear-gradient(-60deg, ${
            theme.colors[theme.primaryColor][4]
          } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
          borderRadius: theme.radius.md,
          padding: `calc(${theme.spacing.xl} * 2.5)`,
      
          [theme.fn.smallerThan("sm")]: {
            padding: `calc(${theme.spacing.xl} * 1.5)`,
          },
        },
      
        title: {
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          color: theme.white,
          lineHeight: 1,
        },
      
        description: {
          color: theme.colors[theme.primaryColor][0],
          maxWidth: rem(300),
      
          [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
          },
        },
      
        form: {
          backgroundColor: theme.white,
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.lg,
        },
      
        social: {
          color: theme.white,
      
          "&:hover": {
            color: theme.colors[theme.primaryColor][1],
          },
        },
      
        input: {
          backgroundColor: theme.white,
          borderColor: theme.colors.gray[4],
          color: theme.black,
      
          "&::placeholder": {
            color: theme.colors.gray[5],
          },
        },
      
        inputLabel: {
          color: theme.black,
        },
      
        control: {
          backgroundColor: theme.colors[theme.primaryColor][6],
        },
      }));
      
      const GoogleLoginScreen = () => {
        const [user, setUser] = useState<any | null>(null);
        const { classes } = useStyles();
      
        useEffect(() => {
          /* global google */
          window.google.accounts.id.initialize({
            client_id: "406744832286-6h2k72iael176uthtqejmsuec0qipnp6.apps.googleusercontent.com",
            callback: handleLogin,
          });

          window.google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            { theme: "outline", size: "large" }
          );
          
          
          
        }, []);

        
        // Send email funct
      
        const handleLogin = (response: any) => {
          console.log("Encoded token: " + response.credential);
          const decoded = jwt_decode(response.credential);
          console.log(decoded);
          setUser(decoded);
         
          const button = document.getElementById("googleButton");
          if (button){
            button.hidden = true;
          }
        };

        const handleFacebookLogin = () => {
          window.FB.login((response: any) => {
            checkLoginState(response);
          }, { scope: 'public_profile,email' });
        };
      
        const checkLoginState = (response: any) => {
          if (response.status === 'connected') {
            // User is logged in and authenticated.
            // You can get user details and access token here.
            console.log(response);
          } else {
            // The user is not logged in.
            console.log('User is not logged in');
          }
        };

        const handleSignOut = (e: any) => {
          e.preventDefault();
          setUser(null);
          const button = document.getElementById("googleButton");
          if (button){
            button.hidden = false;
          }
        };
      
        // contact form
        return (
          
          <div className={classes.wrapper}>
            <div id="fb-root"></div>
            <div id="googleButton"></div>
            
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            
            {user && 
              <div>
                <img src={user.picture}/>
                
              </div>
              }
              <div>
                
              <div
                className="fb-login-button"
                data-width="100"
                data-size=""
                data-button-type=""
                data-layout=""
                data-auto-logout-link="true"
                data-use-continue-as="false"/>
              </div>
          </div>
        );
      };
      
export default GoogleLoginScreen;