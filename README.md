# httt-expert-sys
# Đề 05
BE: node
FE: react

Một số chỉ số sức khoẻ có thể sử dụng:

https://youmed.vn/tin-tuc/xet-nghiem-chi-so-suc-khoe/#:~:text=Ch%E1%BB%89%20s%E1%BB%91%20s%E1%BB%A9c%20kh%E1%BB%8Fe%20%C4%91%C6%B0%E1%BB%A3c,v%E1%BB%A5%20ch%C4%83m%20s%C3%B3c%20s%E1%BB%A9c%20kho%E1%BA%BB.

https://www.bachhoaxanh.com/kinh-nghiem-hay/8-chi-so-lien-quan-den-suc-khoe-ma-ai-cung-nen-biet-1444094


####################### Báo cáo #######################

https://docs.google.com/document/d/18T-FmC-4HI8SYgh7Kc9_74G1Kb9KJd2N/edit#


Công việc cần làm: 
1. Thu thập tri thức - Lấy các chỉ số đánh giá sức khoẻ như: chiều cao + cân nặng(BMI), nhịp tim, huyết áp......(Google search và tham khảo 2 link ở trên về 1 số chỉ số)
    - Với các chỉ số có được, với giá trị nào thì được đánh giá là khoẻ mạnh (search). Ví dụ: nhịp tim bình thường trong khoảng 60-100 nhịp/phút, cao hơn có thể k khoẻ mạnh
    - Trích dẫn nguồn mình lấy - tìm trang uy tín như của các bác sỹ hoặc bệnh viện. Hạn chế sử dụng wikipedia. Tốt hơn thì có thể trích dẫn từ bài nghiên cứu nước ngoài (Search qua google schoolar)
    - Tìm số liệu liên quan, ví dụ số liệu nhịp tim - Phần này k có thì thôi, fake số liệu. Ví dụ, fake số liệu nhịp tim của 1 người và dựa vào giá trị và điều kiện tìm được ở trên để đánh giá mức độ khoẻ mạnh. VD: nhịp tim 130 -> không khoẻ mạnh
    - Tạo dữ liệu dưới dạng file JSON. Nhớ để tên tiếng anh để code k phải sửa
    Ví dụ:
    {
        heartbeat: 100,
        height: 180,
        weight: 100   
    }
2. Xây dựng lý thuyết hệ mờ & neurons. hệ mờ dễ, neurons khó hơn. 
    - Đọc docs, search google thường khó áp dụng. Xây dựng xong lý thuyết rồi thì code dễ.
    - Xây dựng lý thuyết áp dụng trong bài toán. Hệ mờ có ví dụ ở file Expert_System_for_Health_Index_Assessment_of_Power.pdf
    - Neurons Network anh em tìm hiểu dần.

3. Xây dựng hệ thống:
    - Phần này Thành làm, train anh em sau. Anh em cố nắm các phần như đề bài của thầy đã.


Optional:


 - Visialize network: https://www.youtube.com/watch?v=lok3RVBwSqE






 ---------- bmi ---------
 
 https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/healthy-weights/canadian-guidelines-body-weight-classification-adults/quick-reference-tool-professionals.html

 BMI applied 2 yrs old+
 https://www.cdc.gov/nccdphp/dnpao/growthcharts/training/bmiage/page2.html

Classification	BMI Category (kg/m²)	Risk of developing health problems
Underweight	< 18.5	Increased
Normal Weight	18.5 - 24.9	Least
Overweight	25.0 - 29.9	Increased
Obese Class I	30.0 - 34.9	High
Obese Class II	35.0 - 39.9	Very high
Obese Class III	>=40.0	Extremely high


------ huyet ap-------
https://www.bloodpressureuk.org/your-blood-pressure/how-to-lower-your-blood-pressure/monitoring-your-blood-pressure-at-home/how-to-measure-your-blood-pressure-at-home/
anh

--------- ldl and hdl
https://medlatec.vn/tin-tuc/hdl-cholesterol-la-gi-va-nhung-canh-bao-doi-voi-suc-khoe-tim-mach-s63-n21358

https://my.clevelandclinic.org/health/articles/11920-cholesterol-numbers-what-do-they-mean#:~:text=Your%20HDL%20(%E2%80%9Cgood%E2%80%9D%20cholesterol,how%20to%20manage%20your%20cholesterol.

anh

--------gi duong huyet
https://youmed.vn/tin-tuc/ban-biet-nhung-gi-ve-chi-so-duong-huyet/

Chỉ số bình thường khi đói ở khoảng từ 90 – 130 mg/dL ( tương ứng với 5,0 – 7,2 mmol/L).
Sau ăn 2 giờ ở mức thấp hơn 180 mg/dL (10 mmol/L).
Chỉ số bình thường trước lúc đi ngủ ở mức 110 – 150 mg/dL (6,0 – 8,3 mmol/L).

trong anh

Result*	A1C Test	Fasting Blood Sugar Test	Glucose Tolerance Test	Random Blood Sugar Test
Diabetes	6.5% or above	126 mg/dL or above	200 mg/dL or above	200 mg/dL or above
Prediabetes	5.7 – 6.4%	100 – 125 mg/dL	140 – 199 mg/dL	 N/A
Normal	Below 5.7%	99 mg/dL or below	140 mg/dL or below	 N/A


----- nhip tim
https://my.clevelandclinic.org/health/diagnostics/17402-pulse--heart-rate

Newborns (birth to 4 weeks): 100 - 205 beats bpm*.
Infant (4 weeks to 1 year): 100 – 180 bpm*.
Toddler (1 to 3 years): 98 - 140 bpm*.
Preschool (3 to 5 years): 80 - 120 bpm.
School-age (5 to 12 years): 75 - 118 bpm.
Adolescents (13 to 18 years): 60 - 100 bpm.