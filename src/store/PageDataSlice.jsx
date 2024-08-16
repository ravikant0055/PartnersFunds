import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  creatingPage: false,
  createPageError: null,
  pageId: null,
  fetchingPage: false,
  fetchedPageData: null,
  fetchPageError: null,
  savingPage:false,
  savedPageData:null,
  savePageError:null,
  validatename:null
};

// Async thunk for creating a page
export const createPage = createAsyncThunk('page/createPage',
  async (values, { rejectWithValue }) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { page_name, page_title } = values;
      const response = await axios.post('http://localhost:8080/page/addPage', {
        page_name: page_name,
        page_file_name: `${page_name}.html`,
        page_title: page_title,
        parent_page_id: null,
        created_by: "admin",
        creation_date: currentDate,
        last_updated_by: "admin",
        last_update_date: currentDate,
      });
      console.log("ID in Slice",response.data);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Async thunk for fetching page details by pageId
export const fetchPageById = createAsyncThunk('page/fetchPageById',
  async (pageId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getPageById/${pageId}`);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

//create attribute by type to generate attribute id 
export const createAttribute = createAsyncThunk('page/createAttribute',
  async (values, { rejectWithValue }) => {
    console.log("post api value",values);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { pageId, type } = values;
      const response = await axios.post('http://localhost:8080/page/addPageAttributes', {
        page_id: pageId ,
        attribute_name:type,
        attribute_type:type,
        created_by:"Praveen",
        creation_date:currentDate,
        last_updated_by:"Praveen",
        last_update_date:currentDate
          });
      console.log("ID in Slice",response.data);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)

export const removeAttributebyId = createAsyncThunk('page/removeAttr',
  async (attId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/page/deletedAttribute?removedAttrId=${attId}`);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);


//create a expression by name and value to generate expression id 
export const createExpression = createAsyncThunk('page/createExpression',
  async (values, { rejectWithValue }) => {
    console.log("exp value",values);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { expressionname, conditions } = values;

      const Exp_attribute_data = conditions.map(condition => ({
        ATTRIBUTE_ID: condition.attribute,
        EXP_OPERATOR: condition.operator,
        VALUE: condition.attvalues,
        PARENT_OPERATOR: condition.parentOperator,
        CREATED_BY: "Ravi",
        CREATION_DATE: currentDate,
        LAST_UPDATED_BY: "Ravi",
        LAST_UPDATE_DATE: currentDate
      }));

      console.log("exp post array data",Exp_attribute_data);
      

      const response = await axios.post('http://localhost:8080/api/expressions', {
            EXPRESSION_NAME: expressionname,
            Exp_attribute_data: Exp_attribute_data,
            CREATED_BY:"Ravi",
            CREATION_DATE:currentDate,
            LAST_UPDATED_BY:"Ravi",
            LAST_UPDATE_DATE:currentDate
      });
      return response.data;

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)

//create a entity by name and value to generate entity id 
export const createEntity = createAsyncThunk('page/createEntity',
  async (values, { rejectWithValue }) => {
    console.log("entity value",values);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { entityname, eotablename } = values;
      const response = await axios.post('http://localhost:8080/page/saveEntityObject', {
            entity_object_name: entityname,
            entity_table_name: eotablename,
            created_by: "praveen",
            creation_date: currentDate,
            last_updated_by: "praveen",
            last_update_date: currentDate
      });
      console.log("response.data",response.data);
      return response.data;
      

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)

export const saveEntityData = createAsyncThunk('page/saveEntityData',
  async (values, { rejectWithValue }) => {
    console.log("entity value",values);
    try {
      // const currentDate = new Date().toISOString().split('T')[0];
      // const { entityname, eotablename } = values;
      const response = await axios.post('http://localhost:8080/page/saveEOData', values);
      console.log("response.data",response.data);
      return response.data;
      

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)

export const createView = createAsyncThunk('page/createView',
  async (values, { rejectWithValue }) => {
    console.log("entity value",values);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { viewname, voquery } = values;
      const response = await axios.post('http://localhost:8080/page/saveViewObject', {
            view_object_name: viewname,
            view_object_sql_query: voquery,
            event_type: "abcd",
            created_by: "praveen",
            creation_date: currentDate,
            last_updated_by: "praveen",
            last_update_date: currentDate
      });
      console.log("response.data",response.data);
      return response.data;
      

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
)



//save page api
export const addPageAsync = createAsyncThunk('savepage/addPage',
  async (values, { rejectWithValue }) => {
    try {
      // const currentDate = new Date().toISOString().split('T')[0];
      const { pageId, JsonElements } = values;
      console.log("values before  Api :  ", pageId);
      console.log("values before  Api :  ", JsonElements);
      const response = await axios.post('http://localhost:8080/page/pagePropDetails', {
        id:pageId,
        JsonElements: JsonElements,
      });
      console.log("Saved page Slice",response.data);
      return response.data; // Return data from successful API call

    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

//pagename validation api
export const validatePageName = createAsyncThunk('page/pageNameValidate',
  async (values, { rejectWithValue }) => {
    if (values === '') {
      return rejectWithValue("*Page name can't be null");
    } else {
      try {
        const response = await axios.post(`http://localhost:8080/page/pageNameValidation?pagename=${values}`);
        if(response.data)
        {
          return rejectWithValue("*Page name already exists");
        }
      } catch (error) {
        return rejectWithValue(error.message); // Return specific error message
      }
    }
  }
);



// Create slice for handling page state
const PageDataSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPage.pending, (state) => {
        state.creatingPage = true;
        state.createPageError = null;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.creatingPage = false;
        state.pageId = action.payload.pageId; // Update state with received pageId
      })
      .addCase(createPage.rejected, (state, action) => {
        state.creatingPage = false;
        state.createPageError = action.payload;
      })
      .addCase(fetchPageById.pending, (state) => {
        state.fetchingPage = true;
        state.fetchedPageData = null;
        state.fetchPageError = null;
      })
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.fetchingPage = false;
        state.fetchedPageData = action.payload;
      })
      .addCase(fetchPageById.rejected, (state, action) => {
        state.fetchingPage = false;
        state.fetchPageError = action.payload;
      })
      .addCase(addPageAsync.pending, (state) => {
        state.savingPage = true; // Add a property for tracking save status
        state.savePageError = null;
        state.savedPageData = null;
      })
      .addCase(addPageAsync.fulfilled, (state, action) => {
        state.savingPage = false;
        state.savedPageData = action.payload;
      })
      .addCase(addPageAsync.rejected, (state, action) => {
        state.savingPage = false;
        state.savePageError = action.payload;
      })


      .addCase(validatePageName.pending, (state) => {
        state.validatename = null; // Reset validation message before making a new request
      })
      .addCase(validatePageName.fulfilled, (state, action) => {
        state.validatename = null; // Clear validation message if the page name is valid
      })
      .addCase(validatePageName.rejected, (state, action) => {
        state.validatename = action.payload; // Set validation error message
      });
  },
});

export default PageDataSlice.reducer;
