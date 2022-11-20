import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='self-center bg-emerald-200 h-100 px-[800px] py-40'>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium       dark:text-gray-700">Chỉ số đường huyết</label>
            <input type="email" id="email" className="shadow-sm    border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Nhập giá trị tại đây..." required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium        dark:text-gray-700">Cân nặng</label>
            <input type="password" id="password" className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-6">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium         dark:text-gray-700">Chiều cao</label>
            <input type="password" id="repeat-password" className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-6">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium   dark:text-gray-700">Chỉ số LDL</label>
            <input type="password" id="repeat-password" className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-6">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium         dark:text-gray-700">Chỉ số HDL</label>
            <input type="password" id="repeat-password" className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-6">
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium         dark:text-gray-700">Chỉ số triglyceride</label>
            <input type="password" id="repeat-password" className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="flex items-start mb-6 mx-40">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300     dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-medium         dark:text-gray-700"><a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Lưu lại thông tin của tôi</a></label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bắt đầu tính toán</button>
        </form>

      </div>
    </div>
  );
}

export default App;
