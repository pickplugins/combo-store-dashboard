
import React from "react";
import { Link } from "react-router-dom";

import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconExternalLink } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";
import Spinner from "../components/Spinner";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import EmailValidator from '../lib/EmailValidator';
import ToggleContent from "../components/ToggleContent";
import ProductsPicker from "../components/shop-elements/ProductsPicker";
import GalleryPicker from "../components/shop-elements/GalleryPicker";
import TermsPicker from "../components/shop-elements/TermsPicker";
import TagsPicker from "../components/shop-elements/TagsPicker";



import {
  IconRefresh, IconTableExport, IconChartHistogram, IconFilterCog, IconPlayerPlay, IconPlayerPause, IconCircleDashedCheck, IconLoader3, IconX
} from "@tabler/icons-react";


function CouponEdit({ user }) {
  const { id } = useParams();

  const { token, t } = useContext(AuthContext);
  var [appData, setappData] = useState(window.appData);
  var [currentObject, setcurrentObject] = useState(null);

  var [loading, setloading] = useState(false);



  function get_product() {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("No token found");
    // }



    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/combo-store/v2/get_coupon",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {
            var errors = res?.errors;
            var success = res?.success;
            var product = res?.product;

            console.log(product)

            setloading(false);
            setcurrentObject(product)

            // setaddTask({ ...addTask, loading: false, errors: errors, success: success })

            // setTimeout(() => {
            // 	setaddTask({ ...addTask, title: "", success: null, errors: null })

            // }, 3000);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }
  function update_product() {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("No token found");
    // }

    // if (currentObject.id < 0) {
    //   return;
    // }

    //var postData = currentObject;

    currentObject.id = id;

    console.log(currentObject)

    var postData = JSON.stringify(currentObject);


    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/combo-store/v2/update_coupon",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {
            var errors = res?.errors;
            var success = res?.success;


            setloading(false);
            //setcurrentObject(res)

            // setaddTask({ ...addTask, loading: false, errors: errors, success: success })

            // setTimeout(() => {
            // 	setaddTask({ ...addTask, title: "", success: null, errors: null })

            // }, 3000);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }






  useEffect(() => {
    get_product();

  }, []);


  var addonsList = [
    { label: "Products ", value: 'products' },
    { label: "Customer ", value: 'customer' },
    { label: "Expiry ", value: 'expiry' },
    { label: "Spend ", value: 'spend' },
    { label: "Categories ", value: 'categories' },
    { label: "User ", value: 'user' },


  ]




  const FAQTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {


          var faq = currentObject.faq;
          faq.splice(index, 1);
          setcurrentObject({ ...currentObject, faq: faq });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const DownloadsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {

          var downloads = currentObject.downloads;
          downloads.splice(index, 1);
          setcurrentObject({ ...currentObject, downloads: downloads });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const GalleryTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {


          var gallery = currentObject.gallery;
          gallery.splice(index, 1);
          setcurrentObject({ ...currentObject, gallery: gallery });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }

  const RelatedProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {

          var relatedProducts = currentObject.relatedProducts;
          relatedProducts.splice(index, 1);
          setcurrentObject({ ...currentObject, relatedProducts: relatedProducts });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }

  const VariationsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {

          var variations = currentObject.variations;
          variations.splice(index, 1);
          setcurrentObject({ ...currentObject, variations: variations });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const CrosssellsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {

          var crosssells = currentObject.crosssells;
          crosssells.splice(index, 1);
          setcurrentObject({ ...currentObject, crosssells: crosssells });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const UpsellsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {

          var upsells = currentObject.upsells;
          upsells.splice(index, 1);
          setcurrentObject({ ...currentObject, upsells: upsells });

        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }







  function onPickRelatedProducts(item) {


    var relatedProducts = currentObject?.relatedProducts ? currentObject.relatedProducts : {};
    relatedProducts.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, relatedProducts: relatedProducts });


  }
  function onPickVariations(item) {

    var variations = currentObject?.variations ? currentObject.variations : {};
    variations.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, variations: variations });


  }
  function onPickUpsells(item) {




    var upsells = currentObject?.upsells ? currentObject.upsells : {};
    upsells.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, upsells: upsells });


  }
  function onPickCrosssells(item) {



    var crosssells = currentObject?.crosssells ? currentObject.crosssells : {};
    crosssells.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, crosssells: crosssells });


  }
  function onPickDownloads(item) {



    var downloads = currentObject?.downloads ? currentObject.downloads : {};
    downloads.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, downloads: downloads });


  }
  function onPickGallery(item) {

    var gallery = currentObject?.gallery ? currentObject.gallery : {};
    gallery.push({ id: item.id, title: item.title, src: item.src })

    setcurrentObject({ ...currentObject, gallery: gallery });


  }
  function onPickFeaturedImage(item) {


    var post_thumbnail = { id: item.id, title: item.title, src: item.src }

    setcurrentObject({ ...currentObject, post_thumbnail: post_thumbnail });



  }




  function toSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // Remove non-alphanumeric chars
      .replace(/\s+/g, '-')          // Replace spaces with -
      .replace(/-+/g, '-');          // Replace multiple - with single -
  }

  function onPickCategories(item) {

    var itemX = { ...item }

    if (itemX.children) {
      delete itemX.children;
    }

    var categories = currentObject.categories;
    const exists = categories.includes(itemX.term_id);  // true



    if (exists) {

      const categoriesX = categories.filter(term => term !== itemX.term_id);

      setcurrentObject({ ...currentObject, categories: categoriesX });


    } else {
      categories.push(itemX.term_id)
      setcurrentObject({ ...currentObject, categories: categories });

    }
  }

  function onPickTags(item) {

    console.log(currentObject)


    var tags = currentObject?.tags;

    console.log(tags)

    // const exists = tags.includes(item.term_id);  // true
    const exists = tags?.some(term => term.term_id === item.term_id);

    if (exists) {
      const tagsX = tags.filter(term => term !== item.term_id);
      setcurrentObject({ ...currentObject, tags: tagsX });
    } else {
      tags.push({ "term_id": item.term_id, "name": item.name })
      setcurrentObject({ ...currentObject, tags: tags });
    }



  }











  return (
    <Layout user={user}>
      <div className="flex-1 my-10">

        <div className="flex gap-5 justify-center">

          <div className="flex flex-col gap-4 w-[800px]">

            <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
              <div>
                {loading && (
                  <div className="flex gap-2 text-amber-600">
                    <div className="animate-spin"><IconFidgetSpinner /> </div>
                    <div>Please wait...</div>

                  </div>
                )}
                {!loading && (
                  <div className="flex gap-2 justify-between items-center">

                    <div className="text-bold">Edit:</div> <div>{currentObject?.title}</div>

                  </div>
                )}

              </div>
              <Link className="flex gap-2 !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm text-gray-600" to={`/product/${id}`}>
                <IconExternalLink /> View
              </Link>
            </div>


            {/* {JSON.stringify(currentObject?.addons)} */}

            <div className="bg-white  rounded-sm ">

              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">General Info</div>

              <div className="p-4 flex flex-col  gap-4">

                <div className="flex flex-col gap-3 ">
                  <label htmlFor="" className="block text-gray-500">
                    {t("Title")}
                  </label>
                  <input
                    type="text"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.title}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      var slug = toSlug(value);

                      setcurrentObject({ ...currentObject, title: value, slug: slug });
                    }}
                  />
                </div>



                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {t("Coupon Code")}
                  </label>
                  <input
                    type="text"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.couponCode}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, couponCode: value });


                    }}
                  />
                </div>

                {/* <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {t("Content")}
                  </label>
                  <textarea
                    type="text"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.post_content}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, post_content: value });
                    }}
                  />
                </div> */}









                <div className="flex flex-col gap-3">
                  <label htmlFor="" className=" text-gray-500">
                    {t("Amount")}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                      value={currentObject?.amount}
                      name="amount"
                      onChange={(ev) => {
                        var value = ev.target.value;
                        setcurrentObject({ ...currentObject, amount: value });


                      }}
                    />

                    {currentObject?.couponType == 'percent' && (
                      <span>%</span>
                    )}
                    {currentObject?.couponType == 'fixed' && (
                      <span>$</span>
                    )}


                  </div>
                </div>

                <div className="flex gap-3">

                  <div className="flex gap-2">
                    <div>
                      <input
                        type="radio"
                        id="couponType-percent"

                        className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        checked={currentObject?.couponType == 'percent' ? true : false}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, couponType: "percent" });


                        }}
                      />
                    </div>
                    <label htmlFor="couponType-percent" className="flex gap-2 cursor-pointer text-gray-500">


                      {t("Percentage discount")}


                    </label>
                  </div>

                  <div className="flex gap-2">

                    <div>
                      <input
                        id="couponType-fixed"
                        type="radio"
                        className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        checked={currentObject?.couponType == 'fixed' ? true : false}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, couponType: 'fixed' });


                        }}
                      />
                    </div>


                    <label htmlFor="couponType-fixed" className="flex gap-2 cursor-pointer text-gray-500">



                      {t("Fixed amount discount")}



                    </label>

                  </div>



                </div>


                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {t("limit")}
                  </label>
                  <input
                    type="number"
                    className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.limit}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, limit: value });


                    }}
                  />
                </div>


                <div className="flex gap-4">


                  <div className="flex flex-col gap-3">
                    <label htmlFor="" className="block text-gray-500">
                      {t("Start Date")}
                    </label>
                    <input
                      type="text"
                      className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                      value={currentObject?.startDate}
                      onChange={(ev) => {
                        var value = ev.target.value;
                        setcurrentObject({ ...currentObject, startDate: value });


                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="" className="block text-gray-500">
                      {t("End Date")}
                    </label>
                    <input
                      type="text"
                      className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                      value={currentObject?.endDate}
                      onChange={(ev) => {
                        var value = ev.target.value;
                        setcurrentObject({ ...currentObject, endDate: value });


                      }}
                    />
                  </div>


                </div>






              </div>
            </div>










          </div>

          <div className=" rounded-sm px-3 w-[400px]">

            <div className="flex flex-col gap-4">

              <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">

                <div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
                  onClick={ev => {
                    update_product()
                  }}
                >Update</div>
              </div>


              <div className="bg-white  rounded-sm ">

                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Publish</div>

                <div className="p-4 flex flex-col text-sm gap-4">



                  {/* {JSON.stringify(currentObject?.postStatus)} */}


                  <div className="flex justify-between items-center gap-3">
                    <label htmlFor="status" className=" text-gray-500">
                      {t("Status")}
                    </label>

                    <select name="status" id="" className="!shadow-none !border-2 border-gray-400 border-solid px-2 py-1 rounded-sm  bg-white " onChange={ev => {

                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, postStatus: value });


                    }}>

                      <option value="publish" selected={currentObject?.postStatus == 'publish' ? "selected" : ""}>Publish</option>
                      <option value="draft" selected={currentObject?.postStatus == 'draft' ? "selected" : ""}>Draft</option>
                      {/* <option value="subscription">Subscription</option>
                  <option value="pwyw">Pay what you want</option> */}

                    </select>

                  </div>





                </div>
              </div>












              <div className="bg-white  rounded-sm ">

                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Addons</div>

                <div className="p-4 flex flex-col  gap-4">


                  <div className="grid grid-cols-2 gap-3 ">

                    {addonsList.map(item => {

                      return (
                        <div className={`flex gap-2 p-3 !shadow-none !border-2 border-gray-400 border-solid  rounded-sm cursor-pointer ${currentObject?.addons?.includes(item?.value) ? "text-white bg-gray-500" : "text-gray-400"} ${item?.value == 'upsellsCrosssells' ? 'col-span-2' : ""} ${item?.value == 'relatedProducts' ? 'col-span-2' : ""}`} onClick={ev => {


                          var value = item.value

                          var addons = currentObject?.addons ? currentObject?.addons : {};

                          if (addons.includes(value)) {
                            const index = addons.indexOf(value);
                            if (index !== -1) {
                              addons.splice(index, 1);
                            }
                          } else {
                            addons.push(value)
                          }

                          setcurrentObject({ ...currentObject, addons: addons });


                        }}>

                          {currentObject?.addons?.includes(item.value) && (
                            <IconCheckbox />
                          )}
                          {!currentObject?.addons?.includes(item.value) && (

                            <IconSquare />
                          )}




                          <span>{item.label}</span>
                        </div>
                      )

                    })}


                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>


      </div>
    </Layout >
  );
}

export default CouponEdit;
