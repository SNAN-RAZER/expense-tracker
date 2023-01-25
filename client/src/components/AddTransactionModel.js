
import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
const AddTransactionModel =({showAddEditTransactionModel,
  selectedItemForEdit,
  setShowAddEditTransactionModel,
  onFinish})=>{
    return(
        
      <Modal  
      cancelButtonProps={{ style: { display: 'none' } }} 
      okButtonProps={{ style: { display: 'none' } }} 
     title={selectedItemForEdit? "Edit transaction" : "Add transaction"}
     open={showAddEditTransactionModel}
     onCancel={()=>setShowAddEditTransactionModel(false)
     
    }
     >
       <Form layout='vertical' className='form'  onFinish={(values)=>onFinish(values)}
       initialValues={selectedItemForEdit}
       >
         <Form.Item label='Amount' name="amount">
           <Input type='number' />
         </Form.Item>

         <Form.Item label='Type' name="type">
           <Select

             options={[
               {
                 value: 'income',
                 label: 'Income',
               },
               {
                 value: 'expense',
                 label: 'Expense',
               },

             ]}
           />
         </Form.Item>
         <Form.Item label='Category' name="category">
           <Select

             options={[
               {
                 value: 'salary',
                 label: 'Salary',
               },
               {
                 value: 'freelance',
                 label: 'Freelance',
               },
               {
                 value: 'entertainment',
                 label: 'Entertainment',
               },
               {
                 value: 'education',
                 label: 'Education',
               },
               {
                 value: 'medical',
                 label: 'Medical',
               },
               {
                 value: 'food',
                 label: 'Food',
               },
               {
                 value: 'tax',
                 label: 'Tax',
               },

             ]}
           />
         </Form.Item >

         <Form.Item label="Date" name="date">
           <Input type='date' />
         </Form.Item>

         <Form.Item label="Reference" name="reference">
           <Input type='text' />
         </Form.Item>
         <Form.Item label="Description" name="description">
           <Input type='text' />
         </Form.Item>
         
      
             <div className="d-flex justify-content-end">
               <button className='primary' type='submit'>Save</button>
             </div>
      

       </Form>
     </Modal>
    )
}

export default AddTransactionModel;