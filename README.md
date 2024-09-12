# Alpha-Tribe-backend

API ENDPOINTS
User Authentication and Management:
1.	User Registration - POST /api/auth/register
○	Request Body: { username, email, password }
○	Response: { success: true, message: 'User registered successfully', userId }
2.	User Login - POST /api/auth/login
○	Request Body: { email, password }
○	Response: { token, user: { id, username, email } }
3.	Get User Profile - GET /api/user/profile/:userId
○	Headers: { Authorization: Bearer <token> }
○	Response: { id, username, bio, profilePicture }
4.	Update User Profile - PUT /api/user/profile
○	Headers: { Authorization: Bearer <token> }
○	Request Body: { username, bio, profilePicture }
○	Response: { success: true, message: 'Profile updated' }

Stock Posts Management:
1.	Create a Stock Post - POST /api/posts
○	Headers: { Authorization: Bearer <token> }
○	Request Body: { stockSymbol, title, description, tags }
○	Response: { success: true, postId, message: 'Post created successfully' }
2.	Get All Stock Posts (with filters and sorting) - GET /api/posts
○	Query Parameters:
■	stockSymbol (optional)
■	tags (optional)
■	sortBy (date or likes, optional)
○	Response: [ { postId, stockSymbol, title, description, likesCount, createdAt } ]
3.	Get a Single Stock Post (with comments) - GET /api/posts/:postId
○	Response: { postId, stockSymbol, title, description, likesCount, comments: [ { commentId, userId, comment, createdAt } ] }
4.	Delete a Stock Post - DELETE /api/posts/:postId
○	Headers: { Authorization: Bearer <token> }
○	Response: { success: true, message: 'Post deleted successfully' }



Bonus (Optional) Endpoints:
1.	Paginated Posts Retrieval - GET /api/posts
○	Query Parameters:
■	page (optional, default: 1)
■	limit (optional, default: 10)
○	Response: [ { postId, stockSymbol, title, description, likesCount, createdAt } ] with pagination metadata.

