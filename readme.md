# SectionManage JS (ALPHA)

Section manager is a free open microframework for manage the dom like a magazine or a book it's easy to use and implement.


# Instructions

to use SectionManager in our app you need to import the files SectionManager.min.js and SectionManager.min.css from dist folder into your webapp, then you have to create two principal content divs in the page.

```
  <div class="main-container">
    <div class="sub-container">
        
        Some pages here...
    
    </div>
  </div>
```

for create the pages of our magazine or book we have to create one div with the following classes

| Class        | Description           |
| ------------- |:-------------:| 
| <strong>zxsh-page</strong>     | defines one page of the book or magazine to show | 
| <strong>first </strong>      | first page of the magazine      |
|  <strong>scb-left</strong>   | |
|  <strong>scb-right</strong>   | |
|  <strong>scb-arrows</strong>   | |


# Gulp and new Code

in order to generate the files(sectionManager.min.js and sectionManager.min.css) you need to follow this commands 

``` 
sudo npm install
```

install all the dependencies from package.json and then use this one.

```
gulp
```