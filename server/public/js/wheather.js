
const onFocastWheatherSubmit = async (event) => {
    event.preventDefault();
    const location = document.querySelector(".search_input").value;
    const focastType = document.querySelector(".focast_type_input").value;
    const unit = focastType == "Temperature" ? "C" : "%";

    document.querySelector(".wheather-status").innerHTML = "...Loading";
    const res = await $.post('/wheather-focast', {
        location
    });

    if(res.code !== 200)
        return document.querySelector(".wheather-status").innerHTML = res.payload;

    const renderData = res.payload[focastType.toLowerCase()];
    document.querySelector(".wheather-status").innerHTML = `Current ${focastType} is ${renderData} ${unit}`;
}