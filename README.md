# ThinkNimble Models for Client-Side Apps

## Installation

To install, you must be a member of the ThinkNimble NPM organization. If you are not, please contact William <william@thinknimble.com> to invite you to the organization.

Once invited, you should be able to get the private token associated with your account. The following steps describe how to configure your computer to use this token.

### Configure NPM to Use Your Private Token

Once you get your private token from NPM's website, create an alias in your `.bashrc` or `.bash_profile`:

```bash
export NPM_PRIVATE_TOKEN="{your_private_token}"
```

Then in your project, you can create a `.npmrc` configuration file with the following content:

```
//registry.npmjs.org/:_authToken=${NPM_PRIVATE_TOKEN}
```

This will read the alias you created from your shell environment. To reload your shell, either restart your terminal or run `source ~/.bashrc` or `source ~/.bash_profile`

### Install the tn-models Package

With your private token configured, you can now install this package as you would any other NPM package.

```bash
npm install @thinknimble/tn-models
```

### Model Class ###

The Model class is the main class that data models are built out of they contain all the logic for a class instance and usually will wrap the api class to provide a full structure for use across the project. 

To define a model simply extend the base Model Class adding in fields as static arguments to the model. Behind the scenes the constructor will pick up properties defined as fields and inject them into the class as internal properties. Only fields defined here will be collected and injected other static methods, getters and properties can be included and will override the defaults if they are already defined. 

***Simple Model***

```
class UserModel extends Model {
    
    static id = new fields.CharField({readOnly:true})
    static firstName = new fields.CharField()
    static lastName = new fields.CharField()
    static age = new fields.IntegerField()
}

```

***Recommended Model***

```
class UserModel extends Model {
    
    static api = UserAPI.create(UserModel)

    static id = new fields.CharField({readOnly:true})
    static firstName = new fields.CharField()
    static lastName = new fields.CharField()
    static age = new fields.IntegerField()
}

```

Above is the recommended structure to follow when creating a model for a service. Injecting the api class directly in your model results in a single datastructure to work with api calls from django. The api mehtod (see bellow) is statically defined from an api class that extends the ModelAPI structure. It has built in methods for common api calls made. To over ride these methods just re-define them 


### ModelAPI ###


**Basic Usage**

```
Class UserAPI extends ModelAPI{

    static ENDPOINT = '/user/'

    get client(){
        return <axiosClient>
    }

}

```
This is all that is required to set up an api class, the client to use and the static endpoint

**Additional set up**

```
Class UserAPI extends ModelAPI{

    static ENDPOINT = '/user/'

    // extend additional filters using the ApiFilter class
    
    static FILTER_MAP = {...UserAPI.FILTER_MAP, organization: ApiFilter.create({key:'organization'})}

    get client(){
        return <axiosClient>
    }

    // override existing method retrieve

    retrieve(id){
        //content
    }



}

```



<table>
<tr>
<th>Method/Property</th>
<th>fn call</th>
<th>Args</th>

<th>description</th>
</tr>

<tr>
<td>getFields()</td>
<td> 
<code>
this.constructor.getFields()
</code>
</td>
<td></td>
<td>Iterates over static properties and extracts the ones that use the Field Class. This will return a list of fields that can be retrieved directly as properties of the class and stores them in a private property called _fields **Note this method is used internally and should be considered private**
<br />
</td>
</tr>
<tr>
<td>getReadOnlyFields</td>
<td> 
<code>
this.constructor.getReadOnlyFields()
</code>
</td>
<td></td>

<td>Iterates over static properties and extracts the ones that use the Field Class and are defined as readOnly. This will return a list of fields that can be retrieved directly as properties of the class and stores them in a private property called _fields. 
<br />
**Note this method is used internally and should be considered private**</td>
</tr>

<tr>
<td>fromAPI</td>
<td> 
<code>
ModelClass.fromAPI()
</code>
</td>
<td>json={}</td>
<td>Iterates over provided object and calls the ModelClass.create() method with the objectToCamelCase method applied to it return an instance of the ModelClass. 
</td>
</tr>

<tr>
<td>toAPI</td>
<td> 
<code>
ModelClass.toAPI()
</code>
</td>
<td>obj,fields=[],excludeFields=[]</td>
<td>Iterates over provided object and calls the objectToSnakeCase method, this will also remove the _fields and any readonly or exclude fields, if fields argument is passed will only include specified fields (still removing all readOnly or excluded fields, useful for partial updates. 
</td>
</tr>

<tr>
<td>toAPI</td>
<td> 
<code>
ModelClass.toAPI()
</code>
</td>
<td>obj,fields=[],excludeFields=[]</td>
<td>Iterates over provided object and calls the objectToSnakeCase method, this will also remove the _fields and any readonly or exclude fields, if fields argument is passed will only include specified fields (still removing all readOnly or excluded fields, useful for partial updates. 
</td>
</tr>


<tr>
<td>createCollection</td>
<td> 
<code>
ModelClass.createCollection()
</code>
</td>
<td>opts</td>
<td>Helper method to create a collectionManager instance of a class (instead of manually doing so by importing the CollectionManager) by default the ModelClass is set to this and will override the model class passed in through opts if one is present
</td>
</tr>


<tr>



</table>



### ApiFilter Class ###

This class creates filters for requests in a consistent structure, to define a new filter add it to the filter maps and declare it with a new ApiFilter class. This filter class will only add filters if there are values and will ommit them by default if they do not. This removes the need to add additional if else checks*.

*Note this is a default behavior if you need null as a value you will need to manually define a filter on the method*




<table>
<tr>
<th>Method/Property</th>
<th>fn call</th>
<th>Args</th>

<th>description</th>
</tr>

<tr>
<td>static create</td>
<td> 
<code>
ModelClass.create()
</code>
</td>
<td>cls</td>
<td>Factory function that creates a wrapper for ModelClass when called from ModelClass (static api = ModelAPI.create(cls))
Most built in methods require the presence of a class which include the to and from api methods
</td>
</tr>


<tr>
<td>FILTERS_MAP</td>
<td> 
<code>
ModelAPI.FILTERS_MAPS
</code>
</td>
<td></td>
<td>
Creates a filters object, by default page, pageSize and ordering are included using the ApiFilter Class. To add additional opts spread the object static FILTERS_MAP ={...ModelAPI.FILTERS_MAP}
</td>

</tr>
<tr>
<td>client</td>
<td> 
<code>
get Client()
</code>
</td>
<td></td>

<td>This getter supplies the client to be used for requests and is required if none is provided an error will be thrown</td>
</tr>

<tr>
<td>list</td>
<td> 
<code>
ModeClass.api.list()
<br />
ModelAPI.list()
</code>
</td>
<td>filters={}, pagination={}</td>
<td>Calls the list method to the api (if this does not exist this will fail) and calls the fromAPI method from the inheriting class
<br />
***Note the buil in method requires use of the recommended strucutre and calls this.cls.fromAPI() which refers to the model class 
</td>
</tr>

<tr>
<td>create</td>
<td> 
<code>
ModeClass.api.create()
<br />
ModelAPI.create()
</code>
</td>
<td>obj,fields=[],excludeFields=[]</td>
<td>Calls the create method to the api (if this does not exist this will fail) and calls the fromAPI method from the inheriting class
<br />
***Note this is different from the static create (factory function)
***Note the buil in method requires use of the recommended strucutre and calls this.cls.fromAPI() which refers to the model class 
</td>
</tr>

<tr>
<td>retrieve</td>
<td> 
<code>
ModeClass.api.retrieve()
<br />
ModelAPI.retrieve()
</code>
</td>
<td>id</td>
<td>Calls the retrieve endpoint of a view
<br />
***Note the buil in method requires use of the recommended strucutre and calls this.cls.fromAPI() which refers to the model class 
</td>
</tr>





<tr>



</table>



### Collection Manager ###

The Collection Manager creates a list collection of a model and is included by default as part of the list method in the ModelAPI, this creates a consistent model for listing resources from the api. It includes default handling for pagination and creates a model out of the results. 

### Pagination Class ###

The pagination class is modeled of the expected django drf paginated queryset but can be easily adpated to work with any (page pagination). This class is automatically applied to the default list method in the ModelAPI class through the collection manager and is applied as filters by default in the FILTER_MAPS




### Fields Class ###

All field types extend the base Field class, they inherit the methods clean(value) (which type casts the value if it is not null/undefined) and getDefaultVal(value) which returns the default value provided (also accepts a function)

**Custom Classes can be created on the fly by extending the Field class**

***NB*** ArrayField requires type to be of class Field and initialized as it calls the clean method (it can also be of any other class interface as long as it has the clean method)

***NB*** ModelField requires ModelClass to be a (defined) Class (uninitialized) and should use the Model Class but can be any class which calls toAPI


<table>
<tr>
<th>field</th>
<th>class</th>
<th>parameters</th>
<th>description</th>
</tr>
<tr>
<td>CharField</td>
<td> 
<code>
new CharField()
</code>
</td>
<td>defaultVal, readOnly</td>
<td>creates a new char field, properties are optional ( defaults: null, false)</td>

</tr>
<tr>
<td>IdField</td>
<td>
<code> new IdField() </code></td>
<td>defaultVal, readOnly</td>
<td>creates a new id field, properties are optional ( defaults: random generated id, false)</td>
</tr>
<tr>
<td>BooleanField</td>
<td><code>new BooleanField()</code></td>
<td>defaultVal, readOnly</td>
<td>creates a new Boolean field, properties are optional </td>
</tr>
<tr>
<td>IntegerField</td>
<td><code>new IntegerField()</code></td>
<td>defaultVal, readOnly</td>
<td>creates a new Integer field (accepts floats as well), properties are optional</td>
</tr>
<tr>
<td>ArrayField</td>
<td><code> new ArrayField({type: new IntegerField()})</code></td>
<td>defaultVal, readOnly, type*</td>
<td>creates a new Array field, properties defaultVal and readOnly are optional ( defaults: null, false) type is required and must be a initiated Field Class (new IntegerField() ) type </td>
</tr>
<tr>
<td>ModelField</td>
<td><code>new ModelField({ModelClass: SomeTnModel })</code></td>
<td>defaultVal, readOnly, many, ModelClass*</td>
<td>creates a new Model field, properties defaultVal and readOnly are optional ( defaults: null, false, false) Model Class is required and must Class Tpye (Not a class Insance), many here will map and call the fromAPI method </td>
</tr>
</table>


