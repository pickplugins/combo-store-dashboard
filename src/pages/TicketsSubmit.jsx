
import React from "react";
import { Link } from "react-router-dom";
import OpenGraph from "../components/shop-elements/OpenGraph";

import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconExternalLink, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";
import PopoverButton from "../components/PopoverButton";
import Spinner from "../components/Spinner";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import ToggleContent from "../components/ToggleContent";
import PromptsPicker from "../components/shop-elements/PromptsPicker";
import MediaPicker from "../components/shop-elements/MediaPicker";
import TermsPicker from "../components/shop-elements/TermsPicker";
import TagsPicker from "../components/shop-elements/TagsPicker";

import { useCounterStore } from '../store/useCounterStore'





function TicketsSubmit({ user }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const prompt_id = parseInt(searchParams.get('prompt_id')); // 'react'
  const category = parseInt(searchParams.get('category')); // 'react'



  const { notifications, addNotification, userDataX, setUserDataX } = useCounterStore()


  var promptData = {
    "title": "",
    "email": userDataX?.email,
    "post_content": "",
    "post_status": "",
    "post_excerpt": "",
    "post_thumbnail": {
      "id": "",
      "src": ""
    },
    "post_thumbnail_url": "",
    "featured": false,
    "markedAs": "open",
    "priority": "1",
    "categories": [],
    "tags": [],
    "voteCount": 0,
    "loveCount": 0,
    "viewCount": 0,
    "prompt_id": 0,
  }



  const { token, t } = useContext(AuthContext);
  var [appData, setappData] = useState(window.appData);
  var [currentObject, setcurrentObject] = useState(promptData);

  var [loading, setloading] = useState(false);
  var [errors, seterrors] = useState([]);
  var [submission, setsubmission] = useState({ id: null, success: false });
  var [OpenGraphData, setOpenGraphData] = useState({ robots: "", keywords: "AI prompt marketplace, ChatGPT prompts, Midjourney prompt library, Downloadable AI prompts, Prompt engineering templates", image: "", url: "https://promptshub.net/tickets-submit/", title: "Create Support Ticket – Get Help from PromptsHub.net Support Team", description: "Submit a support ticket on PromptsHub.net to quickly resolve your issues with AI prompts, account management, or billing. Our dedicated team is here to assist you promptly and efficiently." });

  useEffect(() => {

    if (prompt_id != undefined) {
      setcurrentObject({ ...currentObject, prompt_id: prompt_id, categories: [{ term_id: category, slug: "prompt-issue" }] })

      setOpenGraphData({ ...OpenGraphData, robots: "noindex, nofollow" })

    }

  }, [prompt_id]);


  function submit_ticket() {
    const token = localStorage.getItem("token");

    // if (!token) {
    //   addNotification({ type: 'error', title: 'Login Required', content: "Please Login to create tickets." })

    //   // throw new Error("No token found");
    // }

    // if (currentObject.id < 0) {
    //   return;
    // }

    //var postData = currentObject;

    if (currentObject.title.length == 0) {
      addNotification({ type: 'error', title: 'Ticket Title Required', content: "Ticket Title should not empty." })
      return;
    }
    if (currentObject.post_content.length == 0) {
      addNotification({ type: 'error', title: 'Ticket Details Required', content: "Ticket Details should not empty." })
      return;
    }



    if (currentObject.email.length == 0) {
      addNotification({ type: 'error', title: 'Email Address Required', content: "Email Address should not empty." })
      return;
    }


    var postData = JSON.stringify(currentObject);


    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/promptshub/v2/submit_ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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



            if (!success) {
              seterrors(errors)
            }
            if (success) {
              seterrors([])

              setsubmission({ ...submission, success: true })
            }


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




















  function toSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')  // Remove non-alphanumeric chars
      .replace(/\s+/g, '-')          // Replace spaces with -
      .replace(/-+/g, '-');          // Replace multiple - with single -
  }

  function onPickCategories_xx(item) {

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


  function onPickCategories(item) {

    var itemX = { ...item }

    if (itemX.children) {
      delete itemX.children;
    }

    var categories = currentObject.categories;
    // const exists = categories.includes(itemX.term_id);  // true
    const exists = categories.find(term => term.term_id === item.term_id);



    if (exists) {

      const categoriesX = categories.filter(term => term.term_id !== itemX.term_id);
      setcurrentObject({ ...currentObject, categories: categoriesX });

    } else {
      categories.push(itemX)
      setcurrentObject({ ...currentObject, categories: categories });

    }
  }






  function onPickTags(items) {


    var tags = currentObject?.tags;
    const mergedUnique = [...new Set([...tags, ...items])];

    setcurrentObject({ ...currentObject, tags: mergedUnique });




  }



  const FAQTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">


        <div>{text}</div>
      </div>
    )

  }

  var faqs = [
    {
      "title": "What is Promptshub support?",
      "content": "Promptshub support is the official help and ticketing system designed to assist users with issues related to their account, subscription, prompt usage, technical errors, or platform-related queries. Users can open support tickets for personalized assistance from the Promptshub team."
    },
    {
      "title": "How do I create a support ticket on Promptshub?",
      "content": "To create a support ticket, log in to your Promptshub account, go to the 'Support' or 'Help Center' section, and click on 'Create Ticket' or 'Submit Request.' Fill in the required details like issue type, description, and any relevant files, then submit the form."
    },
    {
      "title": "What types of issues can I report via Promptshub support tickets?",
      "content": "You can report account access issues, billing or subscription problems, prompt errors or malfunctions, AI output issues, bug reports, content violations, or general inquiries related to Promptshub services and integrations."
    },
    {
      "title": "How long does it take to get a response from Promptshub support?",
      "content": "Promptshub support typically responds within 24 to 48 hours, depending on ticket volume and the nature of your request. Urgent issues such as account lockouts or billing failures are prioritized and usually addressed more quickly."
    },
    {
      "title": "How do I check the status of my Promptshub support ticket?",
      "content": "After submitting a ticket, you'll receive a confirmation email with a ticket ID. You can track the status by logging into your account and navigating to the 'My Tickets' or 'Support History' section, where updates and agent replies will be posted."
    },
    {
      "title": "Can I submit screenshots or files with my Promptshub ticket?",
      "content": "Yes, Promptshub allows users to attach relevant files or screenshots when submitting a ticket. This helps the support team better understand and diagnose the issue, leading to a quicker and more accurate resolution."
    },
    {
      "title": "Is there a priority system for Promptshub support tickets?",
      "content": "Yes, Promptshub prioritizes tickets based on urgency and severity. For example, account-related or billing issues are handled as high priority, while feature suggestions or general inquiries may be treated as standard or low priority."
    },
    {
      "title": "What should I include in my Promptshub support ticket for faster resolution?",
      "content": "For the fastest support, include a clear subject, a detailed description of the issue, steps to reproduce it (if applicable), your account email or ID, and any screenshots or relevant URLs. The more context you provide, the better the support team can assist you."
    },
    {
      "title": "Can I get help with prompt formatting or prompt creation via support?",
      "content": "Yes, Promptshub support can guide users on how to structure prompts, troubleshoot prompt errors, and ensure compatibility with various AI tools. For advanced support, Promptshub may also direct you to tutorials or community resources."
    },
    {
      "title": "Is Promptshub support available 24/7?",
      "content": "Promptshub support is available 24/7 for ticket submission, but agent responses are typically handled during business hours based on your region. You can submit a ticket at any time, and it will be queued for review by the support team."
    }
  ]










  return (
    <Layout user={user}>
      <OpenGraph
        OpenGraphData={OpenGraphData}
      />

      <div className="flex-1 py-10 bg-gray-700 text-gray-200">

        <div className="flex gap-5 justify-center flex-wrap">

          <div className="flex flex-col gap-4 lg:w-[800px] w-full order-2 lg:order-1">

            {loading && (

              <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
                <div>
                  <div className="flex gap-2 text-amber-600">
                    <div className="animate-spin"><IconFidgetSpinner /> </div>
                    <div>{t("Please wait")}</div>

                  </div>



                </div>

              </div>
            )}

            {submission.success && (

              <div className="flex justify-between gap-2  bg-white  rounded-sm px-5 py-3">

                <div className="font-bold flex gap-2 text-amazon-600">
                  <IconRosetteDiscountCheck />
                  <div>{t("Thanks for your submission")}</div>

                </div>

                <div className="text-red-600 cursor-pointer" onClick={ev => {
                  setsubmission({ ...submission, success: false })

                }}>
                  <IconX />
                </div>


              </div>

            )}


            {Object.entries(errors).length > 0 && (

              <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
                <div>
                  <div className="flex flex-col gap-2 text-red-400">

                    <div className="font-bold">{t("Errors")}</div>

                    {Object.entries(errors).map(item => {

                      return (
                        <div className="py-1 flex gap-2">
                          <IconExclamationCircle /> <div>{item[1]}</div>
                        </div>
                      )

                    })}

                  </div>



                </div>

              </div>
            )}





            {/* <code>{JSON.stringify(currentObject)}</code> */}

            <div className="bg-gray-800  rounded-sm ">

              <div className="px-5 py-3 text-xl border-b border-solid border-gray-700">{t("Create Support Ticket")}</div>

              <div className="p-4 flex flex-col  gap-4">

                <div className="flex flex-col gap-3 ">
                  <label htmlFor="" className="block ">
                    {t("Ticket Title")}
                  </label>
                  <input
                    type="text"
                    className="!shadow-none bg-gray-700 !border-2 border-gray-600 px-2 py-1 rounded-sm w-full "
                    value={currentObject?.title}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      var slug = toSlug(value);

                      setcurrentObject({ ...currentObject, title: value, slug: slug });
                    }}
                  />
                </div>



                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block ">
                    {t("Ticket Details")}
                  </label>
                  <textarea
                    type="text"
                    className="!shadow-none h-40 bg-gray-700 !border-2 border-gray-600 px-2 py-1 rounded-sm w-full "
                    value={currentObject?.post_content}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, post_content: value });
                    }}
                  />
                </div>




                <div className="flex flex-col gap-3 ">
                  <label htmlFor="" className="block ">
                    {t("Your Email")}
                  </label>
                  <input
                    type="email"
                    className="!shadow-none bg-gray-700 !border-2 border-gray-600 px-2 py-1 rounded-sm w-full "
                    value={currentObject?.email}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      var slug = toSlug(value);

                      setcurrentObject({ ...currentObject, email: value, slug: slug });
                    }}
                  />
                </div>




              </div>
            </div>

            <div className="p-5 bg-gray-800 rounded-sm">
              <div className="flex gap-3">

                <div className="text-2xl text-white">{t("Frequently Asked Questions")}</div>



              </div>
              <div className="my-4 flex flex-col gap-5 ">


                {faqs && (

                  <div className="my-4">
                    {faqs.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="text-gray-200">


                            {item?.content}


                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>

            </div>



          </div>

          <div className=" rounded-sm px-3 lg:w-[400px] w-full order-1 lg:order-2">

            <div className="flex flex-col gap-4">

              <div className="bg-gray-800  rounded-sm px-5 py-3 flex justify-end items-center">


                <div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
                  onClick={ev => {
                    submit_ticket()
                  }}
                >{t("Submit")}</div>
              </div>


              <div className="bg-gray-800  rounded-sm ">

                <div className="px-5 py-3 text-xl border-b border-solid border-gray-600">{t("Publish")}</div>

                <div className="p-4 flex flex-col text-sm gap-4">

                  {/* <div className="flex justify-between items-center gap-3">
                    <label htmlFor="" className="block text-gray-300">
                      {t("Featured?")}
                    </label>
                    <div>
                      <div onClick={ev => {
                        var featured = !currentObject?.featured;
                        setcurrentObject({ ...currentObject, featured: featured });
                      }} className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-2 bg-gray-600 text-white">

                        {currentObject?.featured && (
                          <><IconStarFilled /></>
                        )}
                        {!currentObject?.featured && (
                          <><IconStar /></>
                        )}
                      </div>
                    </div>
                  </div> */}



                  <div className="flex justify-between items-center gap-3">
                    <label htmlFor="priority" className=" text-gray-300">
                      {t("Priority")}
                    </label>

                    <select name="priority" id="" className="!shadow-none !border-2 border-indigo-600 border-solid px-2 py-1 rounded-sm  bg-gray-700 " onChange={ev => {

                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, priority: value });


                    }}>

                      <option value="1" selected={currentObject?.priority == '1' ? "selected" : ""}>{t("Normal")}</option>
                      <option value="10" selected={currentObject?.priority == '10' ? "selected" : ""}>{t("High")}</option>
                      <option value="90" selected={currentObject?.priority == '90' ? "selected" : ""}>{t("Urgent")}</option>


                    </select>

                  </div>





                  <div className="flex justify-between items-center gap-3 ">
                    <label htmlFor="" className="block ">
                      {t("Prompt ID")}
                    </label>
                    <input
                      type="text"
                      className="!shadow-none bg-gray-700 !border-2 border-gray-600 px-2 py-1 rounded-sm  "
                      value={currentObject?.prompt_id}
                      onChange={(ev) => {
                        var value = ev.target.value;
                        var slug = toSlug(value);

                        setcurrentObject({ ...currentObject, prompt_id: value, slug: slug });
                      }}
                    />
                  </div>









                  {/* <div className="flex justify-between items-center gap-3">
                    <label htmlFor="priority" className=" text-gray-300">
                      {t("Marked As")}
                    </label>
                    <select name="markedAs" id="" className="!shadow-none !border-2 border-indigo-600 border-solid px-2 py-1 rounded-sm  bg-gray-700 " onChange={ev => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, markedAs: value });
                    }}>
                      <option value="open" selected={currentObject?.markedAs == 'open' ? "selected" : ""}>{t("Open")}</option>
                      <option value="closed" selected={currentObject?.markedAs == 'closed' ? "selected" : ""}>{t("Closed")}</option>
                      <option value="processing" selected={currentObject?.markedAs == 'processing' ? "selected" : ""}>{t("Processing")}</option>
                    </select>
                  </div> */}






                </div>
              </div>




              <div className="bg-gray-800  rounded-sm ">

                <div className="px-5 py-3  border-b border-solid border-gray-600 flex justify-between">
                  <span className="text-xl">{t("Categories")}</span>


                </div>

                <div className="p-4 flex flex-col  gap-4 h-[300px] overflow-y-auto">


                  <TermsPicker taxonomy="ticket_cat" showCount={true} hierarchical={true} selected={currentObject?.categories} onPick={onPickCategories} />


                </div>
              </div>

              <div className="bg-gray-800  rounded-sm ">

                <div className="px-5 py-3  border-b border-solid border-gray-600 flex justify-between">
                  <span className="text-xl">{t("Tags")}</span>


                </div>

                <div className="p-4 flex flex-col  gap-4">


                  <div className="my-3">

                    <div className="flex gap-2 items-center flex-wrap ">
                      {currentObject?.tags?.map((item, index) => {

                        return (
                          <div className="text-sm flex items-center gap-2 !shadow-none !border-2 border-gray-600 border-solid  pl-2 rounded-sm cursor-pointer hover:bg-gray-400 hover:text-white ">
                            <div>{item}</div>
                            <div className="hover:bg-red-400 px-1 py-1 rounded-sm" onClick={ev => {
                              var tags = currentObject.tags;
                              tags.splice(index, 1);

                              setcurrentObject({ ...currentObject, tags: tags });

                            }}><IconTrash /></div>
                          </div>
                        )
                      })}
                    </div>


                  </div>

                  <TagsPicker taxonomy="ticket_tag" selected={currentObject?.tags} onPick={onPickTags} />


                </div>
              </div>










            </div>

          </div>

        </div>


      </div>
    </Layout >
  );
}

export default TicketsSubmit;
