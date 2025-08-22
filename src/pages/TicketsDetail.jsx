import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import ImageGallery from "../components/shop-elements/ImageGallery";
import Comments from "../components/shop-elements/Comments";
import CommentsList from "../components/shop-elements/CommentsList";
import CommentsForm from "../components/shop-elements/CommentsForm";
import RelatedPosts from "../components/shop-elements/RelatedPosts";
import Popover from "../components/Popover";
import ToggleContent from "../components/ToggleContent";
import EmailSubscribe from "../components/EmailSubscribe";

import PlaceholderEditor from "../components/shop-elements/PlaceholderEditor";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconEyeSearch, IconReplace } from "@tabler/icons-react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import OpenGraph from "../components/shop-elements/OpenGraph";
import { useCounterStore } from '../store/useCounterStore'


function TicketsDetail({ user }) {
  const { id } = useParams();
  const { t, userData } = useContext(AuthContext);
  const { notifications, addNotification } = useCounterStore()


  var [appData, setappData] = useState(window.appData);
  var [promptData, setpromptData] = useState(null);
  var [loading, setloading] = useState(false);
  var [editPlaceholders, seteditPlaceholders] = useState(null);

  function fetchPost() {
    const token = localStorage.getItem("token");

    setloading(true);

    // if (!token) {
    //   throw new Error("No token found");
    // }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/promptshub/v2/get_ticket", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: postData,
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {

            var prompt = res?.prompt;




            setpromptData(prompt)
            setloading(false);



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
    setTimeout(() => {
      viewPost(id)
    }, 500)
  }, [id]);





  const copyData = (data) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
      })
      .catch((err) => { });
  };


  function formatDate(dateInput) {


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

    //return ;

    return (
      <>
        {format.replace("d", day).replace("m", month).replace("Y", year)}
      </>

    );

  }

  function downloadPrompt() {

    // download_count(promptData?.id)

    const token = localStorage.getItem("token");

    if (!token) {

      addNotification({ type: 'error', title: 'Login Required', content: "Please Login to download prompt" })

      throw new Error("No token found");
    }

    var allowDownload = false;

    var postData = {
      id: promptData?.id,
    };

    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/promptshub/v2/download_count", {
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




            var content = promptData?.content;
            var title = toSlug(promptData?.title)


            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = promptData?.id + "-" + title + ".txt";  // file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

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

  function toSlug(text) {
    return text
      .toLowerCase()
      .replace(/\[.*?\]/g, '')        // remove anything inside [ ]
      .replace(/[^\w\s-]/g, '')       // remove non-word chars except space and dash
      .replace(/\s+/g, '-')           // replace spaces with dashes
      .replace(/-+/g, '-')            // collapse multiple dashes
      .replace(/^-|-$/g, '');         // trim starting/trailing dash
  }






  function votePost(postId, action) {

    const token = localStorage.getItem("token");


    if (!token) {

      addNotification({ type: 'error', title: 'Login Required', content: "Please Login to vote prompt" })

      throw new Error("No token found");
    }


    // if (!token) {
    // 	throw new Error("No token found");
    // }

    // if (action) {
    // 	return;
    // }

    var postData = {
      id: postId,
      action: action,
    };



    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/promptshub/v2/post_vote", {
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



            setTimeout(() => {
              addNotification({ type: 'success', title: 'Great! You earned credits', content: "By Voting other content you will earn credits." })

            }, 500);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }

  function viewPost(postId) {

    const token = localStorage.getItem("token");

    // if (!token) {
    // 	throw new Error("No token found");
    // }

    // if (action) {
    // 	return;
    // }

    var postData = {
      id: postId,
      source: 'archive',
    };


    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/promptshub/v2/post_view", {
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

  function lovePost(postId) {

    const token = localStorage.getItem("token");

    if (!token) {

      addNotification({ type: 'error', title: 'Login Required', content: "Please Login to Love prompt" })

      throw new Error("No token found");
    }

    var loved = promptData?.loved;



    var postData = {
      object_id: postId,
      source: 'archive',
    };


    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/promptshub/v2/post_loved", {
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


            setTimeout(() => {

              if (loved) {
                var loveCount = promptData.loveCount - 1;
                loved = false;
              } else {
                var loveCount = promptData.loveCount + 1;
                loved = true;
                addNotification({ type: 'success', title: 'Great! You earned credits', content: "By Loving other content you will earn credits." })

              }

              setpromptData({ ...promptData, loveCount: loveCount, loved: loved })

            }, 200);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });

  }




  const communityComments = [
    "Need help ASAP!",
    "Can't log in.",
    "Site is down?",
    "Where's my order?",
    "App keeps crashing.",
    "Reset password link?",
    "Live chat not working.",
    "Billing error shown.",
    "No reply yet.",
    "Thanks for the fix!",
    "Account locked out.",
    "Payment failed again.",
    "Error on checkout.",
    "Still not working.",
    "Please respond soon.",
    "Issue not resolved.",
    "Link is broken.",
    "Stuck on loading.",
    "Support is offline.",
    "Can't upload files."
  ];






  return (
    <Layout user={user} >

      <div className="  w-full xl:w-[1200px] mx-auto my-10 ">

        {loading && (
          <div className=" flex justify-center">
            <div className="bg-white px-5 py-2 rounded-sm flex gap-3 items-center"><Spinner /> <div>{t("Loading")}</div></div>
          </div>

        )}


        <div className=" p-5 flex flex-col gap-10 ">

          <div className="grid grid-cols-1 lg:grid-cols-1 p-5 gap-10 bg-gray-800 text-gray-200 rounded-sm">

            {/* {JSON.stringify(promptData?.gallery)} */}



            <div className="text-left flex flex-col gap-4 ">
              <div className=" text-2xl">{promptData?.title}</div>

              <div className="flex gap-4 flex-wrap">
                <div className="flex gap-3 items-center">

                  <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-2 rounded-sm flex gap-2 items-center" onClick={() => {


                    votePost(promptData?.id, 'upvote');
                    var voteCount = parseInt(promptData.voteCount) + 1;;
                    setpromptData({ ...promptData, voteCount: voteCount })
                  }}>
                    <IconThumbUp width={20} />

                  </div>

                  <div>{promptData?.voteCount}</div>

                  <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-2 rounded-sm flex gap-2 items-center" onClick={() => {

                    votePost(promptData?.id, 'downvote');

                    var voteCount = parseInt(promptData.voteCount) - 1;;
                    setpromptData({ ...promptData, voteCount: voteCount })

                  }}>
                    <IconThumbDown width={20} />

                  </div>

                </div>

                <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" ><IconEyeSearch />
                  <div>{promptData?.viewCount}</div>
                </div>



                <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center " onClick={ev => {





                  lovePost(promptData?.id);

                  var loved = !promptData.loved;
                  setpromptData({ ...promptData, loved: loved })


                }}>

                  {promptData?.loved && (
                    <div className="flex gap-2 ">

                      <div className="text-red-400">
                        <IconHeartFilled />
                      </div>

                      <div>{promptData?.loveCount}</div>
                    </div>
                  )}
                  {!promptData?.loved && (
                    <div className="text-red-500 flex gap-2"><IconHeart /> <div>{promptData?.loveCount}</div></div>


                  )}




                </div>

              </div>





              <div className="flex gap-3 items-center">

                <div className="flex gap-4 items-center">

                  <div className="  overflow-hidden">
                    <img className="rounded-full " src={promptData?.author.avatar} alt={promptData?.author.name} />
                  </div>
                  <div>


                    <div className="text-left text-gray-200 font-medium" to={`/author/${promptData?.author?.id}/`}>
                      {promptData?.author.name}
                    </div>
                  </div>

                </div>


                {promptData?.categories.map((item, index) => {
                  return (
                    <div className="flex gap-2 flex-wrap items-start">
                      <div>{t("Categories")}</div>
                      <div key={index} className="border border-gray-700 px-2 py-1 rounded-sm hover:bg-gray-700 cursor-pointer">
                        <span>{item.name}</span>
                        {/* {promptData?.categories.length > (index + 1) && (
                        <span>,</span>
                      )} */}
                      </div>
                    </div>
                  )
                })}









                {promptData?.tags.map((item, index) => {
                  return (
                    <>
                      <div className="flex gap-2 flex-wrap">

                        <div>	{t("Tags")}</div>
                        <div key={index} className="flex flex-wrap">
                          <span>{item}</span>
                          {promptData?.tags.length > (index + 1) && (
                            <span>,</span>
                          )}
                        </div>
                      </div>
                    </>
                  )
                })}


              </div>







            </div>

          </div>


          {promptData?.content && (
            <div className=" p-5 gap-10 bg-gray-500 text-gray-200 rounded-sm">

              <div className=" w-full mx-auto">
                <div className="text-2xl text-white mb-5">{t("Ticket Details")}</div>

                <div>
                  {promptData?.content}
                </div>
              </div>



            </div>
          )}






          <div>
            <Comments dummyComments={communityComments} id={id} />
          </div>

          <div className=" p-5 gap-10 bg-gray-500 text-gray-200 rounded-sm">
            <div className="xl:w-[500px] w-full mx-auto">
              <div className="text-2xl text-white mb-5">{t("Subscribe to News")}</div>
              <EmailSubscribe />
            </div>
          </div>







          {/* <div className="p-5 bg-gray-800 rounded-sm">
            <div className="flex gap-3">
              <div className="text-2xl text-white">{t("Related Prompts")}</div>
            </div>
            <div className="my-4 ">


              <RelatedPosts />


            </div>

          </div> */}



        </div>

      </div>








    </Layout>
  )


}

export default TicketsDetail;
