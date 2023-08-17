# Hotel Back End

## Api Documentation

### A. Authentication

#### 1. Login

##### Endpoint

```Javascript
POST /api/login
```

##### Field

| Field           | Description                         | Type   | Validation                        |
| --------------- | ----------------------------------- | ------ | --------------------------------- |
| username           | Username for login           | String | Valid username                       |
| password        | The password used to login       | String | minimum 8 character               |

##### Example for Request and Response

```Javascript
// Correct Request
{
    username : 'admin',
    password : '12345678',
}
// Correct Response
200 OK
{
    status : 'success',
    token : 'YOUR ACESS TOKEN IN HERE'
}
// Wrong Request
{
    username : 'adminx',
    password : 'indonesiainyabesar',
}
// Wrong Response
401 UNAUTHORIZED
{
    status : 'error',
    msg : 'Username atau Password Salah'
}
```

### B. Room Hotel

#### 1. View All Room Hotel

##### Endpoint

```Javascript
GET /api/room
```

##### Example For Response

```Javascript
// Response
200 OK
{
    status : 'success',
    data : [
        {
            _id : '6353b066327fac926fb26d7a',
            name : 'Reguler Room',
            price : 450000,
            description : 'This room have 1 bed with regular size with 1 bathroom',
            photo : 'https://www.italianbark.com/wp-content/uploads/2018/01/Muji-Hotel-Shenzhen-02-hotel-room-design-trends-italianbark-.jpg'
        }
    ]
}
```

#### 2. View Room Hotel By ID 

##### Endpoint

```Javascript
GET /api/room/:id
```

##### Example For Response


```Javascript
GET /api/room/6353b066327fac926fb26d7a

// Response
200 OK
{
    status : 'success',
    data : {
        _id : '6353b066327fac926fb26d7a',
        name : 'Reguler Room',
        price : 450000,
        description : 'This room have 1 bed with regular size with 1 bathroom',
        photo : 'https://www.italianbark.com/wp-content/uploads/2018/01/Muji-Hotel-Shenzhen-02-hotel-room-design-trends-italianbark-.jpg'
    }
}
```
#### Note

##### For Next API must Using Headers

```Javascript
// Correct Headers
Authorization : 'Bearer YOUR ACCESS TOKEN IN HERE'

// Response With No Headers
401 UNAUTHORIZED
{
    status : 'fail',
    msg : 'Token Tidak ditemukan'
}

// Response With Invalid Token
403 FORBIDDEN
{
    status : 'fail',
    msg : 'Token Tidak Valid'
}
```

#### 3. Create Room Hotel

##### Endpoint

```Javascript
POST /api/hotel
```

##### Example For Response

```Javascript
// Correct Request
{
    name : 'Reguler Room',
    price : 450000,
    description : 'This room have 1 bed with regular size with 1 bathroom',
    photo : 'https://www.italianbark.com/wp-content/uploads/2018/01/Muji-Hotel-Shenzhen-02-hotel-room-design-trends-italianbark-.jpg'
}

// Correct Response
200 OK
{
    status : 'success',
    data : {
            _id : '6353b066327fac926fb26d7a',
            name : 'Reguler Room',
            price : 450000,
            description : 'This room have 1 bed with regular size with 1 bathroom',
            photo : 'https://www.italianbark.com/wp-content/uploads/2018/01/Muji-Hotel-Shenzhen-02-hotel-room-design-trends-italianbark-.jpg'
    }
}

// Wrong Request
{
    name : 'Reguler Room',
    price : 450000,
    description : 'This room have 1 bed with regular size with 1 bathroom',
}

// Wrong Response
400 BAD REQUEST
{
    status : 'fail',
    errors : [
        {
            type : 'field',
            msg : 'Invalid value',
            path : 'photo',
            location : 'body'
        }
    ]
}
```

#### 4. Update Room Hotel By ID 

##### Endpoint

```Javascript
PUT /api/room/:id
```

##### Example For Response


```Javascript
PUT /api/room/6353b066327fac926fb26d7a

// Request
{
    name : 'Suite Room',
    price : 4500000,
    description : 'This room have 3 bed with King size with 2 bathroom with a bathub',
    photo : 'https://www.dictio.id/uploads/db3342/optimized/3X/a/5/a5b4002e3a69d1c79852aa0030991fafc53797a1_2_1035x525.jpeg'
}

// Response
200 OK
{
    status : 'success',
    msg : 'Berhasil Melakukan Update Room'
}
```

#### 5. Delete Room Hotel By ID 

##### Endpoint

```Javascript
DELETE /api/room/:id
```

##### Example For Response


```Javascript
DELETE /api/room/6353b066327fac926fb26d7a

// Response
200 OK
{
    status : 'success',
    msg : 'Berhasil Melakukan Delete Room'
}
```