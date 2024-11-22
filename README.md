<br />
<br />

<h1 align="center">
  Rhéa'rmony
</h1>

<br />

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/Agence-ARTH/Rhearmony">
</p>


<h3 align="center">
  <b>
    Application for Rhéa'rmony 📗📘
  </b>
</h3>

<br />


## Getting Started

1. Initialize the supabase local server

```sh
make supabase-start
```

2. Create a admin account from supabase dashboard
```
http://localhost:54323

email: {something}+admin@{something}.com
password: {something}
```

3. Install dependencies
```sh
make install
```

4. Setup the environment variables
```sh
cp /packages/admin/.env.example /packages/admin/.env.development
```

5. Start the application
```sh
make admin-start
```

## Help

All the commands are available in the Makefile

```sh
make help
```


## Contact

[@arimet](https://github.com/arimet) – Anthony RIMET
[@HZooly](https://github.com/HZooly) - Hugo TORZUOLI
