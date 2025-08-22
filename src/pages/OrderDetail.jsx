import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function OrderDetail({ user }) {
  const { id } = useParams();
  const { t } = useContext(AuthContext);


  var [appData, setappData] = useState(window.appData);


  var [orderData, setorderData] = useState(null);
  var [downloadsData, setdownloadsData] = useState(null);
  var [licenseData, setlicenseData] = useState(null);
  var [subscriptionData, setsubscriptionData] = useState(null);






  function fetchPost() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/combo-store/v2/get_order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {

            var order = res?.order;
            var downloads = res?.downloads;
            var license = res?.license;
            var subscription = res?.subscription;

            console.log(order)


            setorderData(order)
            setdownloadsData(downloads)
            setlicenseData(license)
            setsubscriptionData(subscription)





            setTimeout(() => {
            }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }

  // useEffect(() => {
  // 	fetchPost();
  // }, []);

  useEffect(() => {
    fetchPost();
  }, [id]);





  function formatDate(dateInput) {

    // console.log(dateInput)

    var format = "d/m/Y";
    dateInput = dateInput == undefined ? '' : dateInput;
    // Ensure date is in a proper format for parsing
    const dateObj = new Date(dateInput.replace(" ", "T"));

    if (isNaN(dateObj)) {
      throw new Error("Invalid date format");
    }

    // Extract date components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();

    // Replace format placeholders with actual values
    //return ;

    return (
      <>
        {format.replace("d", day).replace("m", month).replace("Y", year)}
      </>

    );

  }





  return (
    <Layout user={user} >

      {/* {JSON.stringify(orderData?.line_items)} */}

      <div className="p-5 grid grid-cols-2 gap-5">


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-4">{t("Order Details ")}</h3>

          <div>
            <ul className="flex flex-col">
              {orderData?.line_items.map(item => {


                return (

                  <li className="flex py-4 justify-between border-0 border-b border-dashed border-b-gray-400">
                    <a target="_blank" className="font-bold" href={item.link}>{item.product_name} X {item.quantity}</a> <div>
                      <span>{item.total} </span>
                      <span dangerouslySetInnerHTML={{ __html: orderData?.currency_symbol }}></span>
                    </div>
                  </li>

                )

              })}

              <li className="flex py-4 justify-between border-0 border-b border-dashed border-b-gray-400">
                <span>Subtotal:</span>

                <div>
                  <span>{orderData?.subtotal}</span>
                  <span dangerouslySetInnerHTML={{ __html: orderData?.currency_symbol }}></span>
                </div>
              </li>
              <li className="flex py-4 justify-between border-0 border-b border-dashed border-b-gray-400">
                <span>Discount:</span>

                <div>
                  <span>-{orderData?.discount_total}</span>
                  <span dangerouslySetInnerHTML={{ __html: orderData?.currency_symbol }}></span>
                </div>
              </li>
              <li className="flex py-4 justify-between border-0 border-b border-dashed border-b-gray-400">
                <span>Total:</span> <div>
                  <span>{orderData?.total}</span>
                  <span dangerouslySetInnerHTML={{ __html: orderData?.currency_symbol }}></span>
                </div>
              </li>
              <li className="flex py-4 justify-between ">
                <span>Payment Method:</span> <div>
                  <span>{orderData?.payment_method_title}</span>
                </div>
              </li>

            </ul>



          </div>

        </div>


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-4">{t("Order Details ")}</h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-50 font-bold">{t("Status")}</div>
            <div className=""> {orderData?.status}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Setup fee")}</div>

            <div className=""> {orderData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Tax")}</div>

            <div className=""> {orderData?.tax_total} {orderData?.currency}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Discount")}</div>

            <div className=""> {orderData?.discount_total} {orderData?.currency}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Date")}</div>

            {/* <div className=""> {formatDate(orderData?.date_created.date)}</div> */}
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold" >{t("Total")}</div>

            <div className=""> {orderData?.total} {orderData?.currency}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Refunded total")}</div>

            <div className=""> {orderData?.refunded_total} {orderData?.currency}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-50 font-bold">{t("Payment method")}</div>

            <div className=""> {orderData?.payment_method_title} </div>
          </div>




        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <div className="grid grid-cols-2 gap-3">

            <div>
              <h3 className="text-2xl my-5">{t("Billing Address")} </h3>

              <ul>
                <li className="flex gap-2">{orderData?.billing?.first_name} {orderData?.billing?.last_name}</li>
                <li className="flex gap-2"> {orderData?.billing?.company}</li>
                <li className="flex gap-2"> {orderData?.billing?.address_1}</li>
                <li className="flex gap-2"> {orderData?.billing?.address_2}</li>
                <li className="flex gap-2"> {orderData?.billing?.city}</li>
                <li className="flex gap-2"> {orderData?.billing?.state}</li>
                <li className="flex gap-2"> {orderData?.billing?.postcode}</li>
                <li className="flex gap-2"> {orderData?.billing?.country}</li>
                <li className="flex gap-2"> {orderData?.billing?.email}</li>
                <li className="flex gap-2"> {orderData?.billing?.phone}</li>

              </ul>



            </div>
            <div>
              <h3 className="text-2xl my-5">{t("Shipping Address")} </h3>

              <ul>
                <li className="flex gap-2">{orderData?.shipping?.first_name} {orderData?.shipping?.last_name}</li>
                <li className="flex gap-2"> {orderData?.shipping?.company}</li>
                <li className="flex gap-2"> {orderData?.shipping?.address_1}</li>
                <li className="flex gap-2"> {orderData?.shipping?.address_2}</li>
                <li className="flex gap-2"> {orderData?.shipping?.city}</li>
                <li className="flex gap-2"> {orderData?.shipping?.state}</li>
                <li className="flex gap-2"> {orderData?.shipping?.postcode}</li>
                <li className="flex gap-2"> {orderData?.shipping?.country}</li>
                <li className="flex gap-2"> {orderData?.shipping?.phone}</li>

              </ul>
            </div>


          </div>




        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-5">{t("Subscription")} </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("Setup fee")}</div>
            <div className=""> {subscriptionData?.setup_fee}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("Total")}</div>
            <div className=""> {subscriptionData?.total}</div>

          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Billing Date")}</div>

            <div className=""> {subscriptionData?.billing_anchor}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Card Last Four')}</div>

            <div className=""> {subscriptionData?.card_last_four}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Test Mode')}</div>

            <div className=""> {subscriptionData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Status')}</div>

            <div className=""> {subscriptionData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('User Email')}</div>

            <div className=""> {subscriptionData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{t('Trial Ends at')}</div>

            <div className=""> {subscriptionData?.trial_ends_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Renews at')}</div>

            <div className=""> {subscriptionData?.renews_at}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t('Ends at')}</div>

            <div className=""> {subscriptionData?.ends_at}</div>
          </div>







        </div>

        <div className="hidden">

          <h3 className="text-xl my-5">{t("License")} </h3>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center">
            <div className=" px-5 py-2 w-40 font-bold">{t("License Key")}</div>
            <div className=""> {licenseData?.license_key}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Activation Limit")}</div>

            <div className=""> {licenseData?.activation_limit}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Instances Count")}</div>

            <div className=""> {licenseData?.instances_count}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Test Mode")}</div>

            <div className=""> {licenseData?.test_mode}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Status")}</div>

            <div className=""> {licenseData?.status}</div>
          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("User Email")}</div>

            <div className=""> {licenseData?.user_email}</div>
          </div>


          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold" >{t("Created at")}</div>

            <div className=""> {licenseData?.created_at}</div>

          </div>
          <div className="border-0 border-b border-solid border-gray-200 flex gap-3 items-center ">
            <div className=" px-5 py-2 w-40 font-bold">{t("Expires at")}</div>

            <div className=""> {licenseData?.expires_at}</div>
          </div>







        </div>
      </div>







    </Layout>
  )


}

export default OrderDetail;
