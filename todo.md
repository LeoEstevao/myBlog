## Analyze multiples Categories in navbar 
>put results limit, and "all categories" (if has too many of then) [-]

## Responsive Layout
>Create tablet and mobile layout[-]

## REMOVE COMMENTS
>Remove non-required coments[-]
>Make a pattern of comments[-]

## Limit/Pagination Categories and Articles 
>Pagination Articles/Categories views (admin)[-]
>Pagination Index, Articles filtered by Categories (users)[-]

## Fix navbar OR CREATE A SIDEBAR FOR USERS NAVIGATION, AND NAVBAR MOSTLY FOR ADMIN NAVIGATION?
>Change Links Redirections (login/logout, others).[x]
>Create two navbar, for users and admin[x]
>Fix navbars refs. There are two navbars, for users and for admin, and they are differents and don't reference each other? (PUT A LOGIN/LOGOUT LINK ON USERS NAVBAR?)[x]
>Fix users navbar for limits of categories (and characters?)[-]

## DATABASE Fixes
>Change the plural to singular on BD, because sequelize automatically messed up everything[x]
    https://stackoverflow.com/questions/49459596/how-do-plurals-work-in-sequelize/49459597
>Create nulls fields on Database [x]
>Validate inputs on with javascript (all need to have value, or create default value on DB).[-]
>Limit chars fields (Like Categories, login, email IN JAVASCRIPT!!!)[-]
>Check if an e-mail is valid?[-]

## PATTERNS
>Make a pattern of references of controles and of ejs files (likes, articId x articleId)[x]
>Create or remove all catch(err) -> Redirect('/')[-]

## CSS/LAYOUT FIXES
>Update layout of articles/categories lists (like the cells with delete/update)[-]
>Update background-color of dropdown menu[-]

# MIDDLEWARES
>Check why the fuckk the middleware in routes users/create don't work[-]
>Check Why the fuck the logout route can't be in the end of the file[-]
https://www.google.com/search?q=Error+%5BERR_HTTP_HEADERS_SENT%5D%3A+Cannot+set+headers+after+they+are+sent+to+the+client&oq=Error+%5BERR_HTTP_HEADERS_SENT%5D%3A+Cannot+set+headers+after+they+are+sent+to+the+client&aqs=chrome..69i57.387j0j7&sourceid=chrome&ie=UTF-8

## IMPROVEMENT
>Make search work[x]
>Make only appear Login OR logout (search all renders, and pass authStatus: req.session.user OR TRY MAKE AN IF(session){autStatus: true}) -> and apply in both navbars[x]
>Create a link on User-Navbar, for admin contents[-]

## QUICK FIX
>Remove debug (json view) from Edit Categorie[x]
>Remove Button 'Artigos mais antigos' from Articles by Categories (even if there is 0 results, it appears)[-]
>Put an default value on select category (when creating a new article)[x]