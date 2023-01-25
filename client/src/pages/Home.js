import { DatePicker, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddTransactionModel from '../components/AddTransactionModel';
import DefalutLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner';
import '../resources/transactions.css';
import moment from 'moment';
import {
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const Home = () => {

  const id = JSON.parse(localStorage.getItem('shey-money'))["_id"];
  const [showAddEditTransactionModel, setShowAddEditTransactionModel] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState('7');
  const [transactions, setTransactions] = useState([]);
  const [selectedRange, setSelectedRange] = useState();
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState('table');
  console.log(selectedRange);
  const onFinish = async (values) => {
    try {
      if(selectedItemForEdit)
      {
        setLoading(true);
        await axios.put("http://localhost:5000/api/v1/users/transactions/edittransaction",
          {
            payload:{
              ...values,
              
            },
            transactionId: selectedItemForEdit._id,
          });
          setLoading(false);
        setShowAddEditTransactionModel(false);
        
        getTransactions();
      }
      
      else{
        setLoading(true);
      const response = await axios.post("http://localhost:5000/api/v1/users/transactions/addtransaction",
        {
          id,
          ...values
        });

      const userdata = await response.data;
      if (response.status === 201) {
        setLoading(false);
        setShowAddEditTransactionModel(false);
        //navigate('/');
        getTransactions();
        setSelectedItemForEdit(null);

        console.log(userdata);
      }
      else {
        console.log(userdata);
      }}
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };



  const getTransactions = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/transactions/gettransactions", {
        id,
        frequency,
        ...(frequency === 'custom' && { selectedRange }),
        type
      });
      const tempTrasactions = await response.data;
      setTransactions(tempTrasactions.trasactions);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTransactions = async (record) => {
    try {
      console.log(record._id)
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/users/transactions/deletetransaction", {
        transactionId: record._id
      });
      getTransactions();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>


    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: "actions",
      render: (text, record) => {
        return <div>
          <EditOutlined
            onClick={() => {
              setSelectedItemForEdit(record)
              setShowAddEditTransactionModel(true)
            }}
          />
          <DeleteOutlined className='mx-3' 
          onClick={()=>deleteTransactions(record)}
          />
        </div>
      }

    }
  ];
  return (
    <DefalutLayout>

      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(value) => { setFrequency(value); getTransactions(); }}
            >
              <Select.Option
                value='7'
              >Last 1 week</Select.Option>
              <Select.Option
                value='30'
              >Last 1 month</Select.Option>
              <Select.Option
                value='365'
              >Last 1 year</Select.Option>
              <Select.Option
                value='custom'
              >custom</Select.Option>
            </Select>

            {
              frequency === 'custom' && (
                <div className="mt-2">
                  <RangePicker
                    value={selectedRange}
                    onChange={(values) => { setSelectedRange(values); getTransactions(); }}
                  />
                </div>
              )

            }

          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select
              value={type}
              onChange={(value) => { setType(value); }}
            >
              <Select.Option
                value='all'
              >All</Select.Option>
              <Select.Option
                value='income'
              >Income</Select.Option>
              <Select.Option
                value='expense'
              >Expense</Select.Option>

            </Select>
          </div>
        </div>


        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined className={`mx-3`} size={30}
                style={{ color: viewType === 'table' ? "black" : "grey" }}
                onClick={() => setViewType('table')}
              />
              <AreaChartOutlined
                onClick={() => setViewType('analytics')}
                style={{ color: viewType === 'analytics' ? "black" : "grey" }}
              />
            </div>
          </div>
        </div>

        <div>


          <button className='primary'
            onClick={() => setShowAddEditTransactionModel(true)}
          >Add new </button>
        </div>
      </div>
      <div className="table-analytics">
        {
          viewType === "table" ? (<div className="table">
            <Table dataSource={transactions} columns={columns} />
          </div>) : <Analytics transactions={transactions} />
        }

      </div>
      <AddTransactionModel 
      selectedItemForEdit={selectedItemForEdit}
      showAddEditTransactionModel={showAddEditTransactionModel} 
      setShowAddEditTransactionModel={setShowAddEditTransactionModel} 
      onFinish={onFinish} 
      setSelectedItemForEdit={setSelectedItemForEdit}
      />
    </DefalutLayout>
  )
}

export default Home