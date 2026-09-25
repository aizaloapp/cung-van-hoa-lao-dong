const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../..');
const TEMPLATE_PATH = path.join(__dirname, '../templates/course-template.html');
const COURSES_JSON_PATH = path.join(ROOT_DIR, 'data/courses.json');
const SITEMAP_PATH = path.join(ROOT_DIR, 'sitemap.xml');
const APP_JS_PATH = path.join(ROOT_DIR, 'js/app.js');

const rawCourses = JSON.parse(fs.readFileSync(COURSES_JSON_PATH, 'utf-8'));
const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Additional Rich Metadata for all 11 new courses
const courseMetadata = {
  'ban-cung': {
    badgeIcon: 'target',
    badgeThemeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    themeGradient: 'from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700',
    asideBorderColor: 'border-blue-600/30',
    instructorShortName: 'Thầy Tiếp',
    instructorAvatarBg: 'bg-amber-100 border-amber-300',
    instructorAvatarText: 'text-amber-600',
    instructorRole: 'Chủ Nhiệm CLB Bắn Cung',
    instructorBio: 'Huấn luyện viên bắn cung chuyên nghiệp, giàu kinh nghiệm hướng dẫn người mới bắt đầu. Thầy Tiếp chú trọng từng tư thế đứng, cách đặt tay và điều hòa nhịp thở giúp học viên bắn trúng bia ngay từ buổi đầu tiên.',
    heroCaption: 'Hình ảnh thực tế buổi huấn luyện tại sân bắn cung ngoài trời Cơ Sở Bình Trưng',
    storyIcon: 'sparkles',
    storyIconColor: 'text-amber-500',
    storyTitle: 'Khoảnh Khắc Kéo Dây Cung: Khi Mọi Ồn Ào Đều Lùi Lại',
    storyParagraphs: `
      <p>
        Có một cảm giác rất đặc biệt mà những người từng đứng trên đường bắn cung đều trải qua: Khi đôi tay nâng cung lên, một tay giữ chắc thân cung, một tay khẽ kéo căng dây về phía góc hàm, hơi thở tự nhiên chậm lại. Trong vài giây ngắn ngủi ấy, mọi deadline công việc, áp lực thi cử hay tiếng còi xe bên ngoài bỗng tan biến hoàn toàn. Toàn bộ thế giới thu nhỏ lại chỉ còn đường ngắm thẳng tắp và hồng tâm màu vàng phía trước.
      </p>
      <p>
        Bắn cung không đơn thuần là một môn thể thao vận động cơ bắp, mà là bộ môn của <strong>sự tĩnh lặng và kỷ luật nội tâm</strong>. Mỗi mũi tên bắn đi là một bài học về sự điềm tĩnh: nếu tâm bạn dao động hoặc hấp tấp, mũi tên sẽ lệch hướng; chỉ khi bạn hít sâu, buông lỏng và dồn trọn tâm trí, tiếng "vút... pặp!" đanh gọn găm trúng bia sẽ mang lại niềm hân hoan khó tả.
      </p>
    `,
    benefitBgGradient: 'from-blue-50 to-sky-50',
    benefitBorderColor: 'border-blue-100',
    benefit1Title: 'Chỉnh Cột Sống & Mở Vai',
    benefit1Desc: 'Động tác kéo căng cung giúp mở rộng lồng ngực, kéo giãn cơ lưng trên, khắc phục hiệu quả tật gù lưng và mỏi cổ do ngồi máy tính nhiều.',
    benefit2Title: 'Rèn Luyện Thị Lực & Tập Trung',
    benefit2Desc: 'Giúp mắt linh hoạt điều tiết tiêu cự xa gần, đặc biệt hữu ích cho học sinh và người làm văn phòng thường xuyên dán mắt vào màn hình.',
    benefit3Title: 'Xả Stress Cực Kỳ Hiệu Quả',
    benefit3Desc: 'Tiếng tên găm chắc nịch vào tâm bia giải phóng hoàn toàn năng lượng tiêu cực, mang lại sự sảng khoái và tự tin cho người bắn.',
    faqs: [
      {
        q: 'Chưa từng cầm cung bao giờ có bắn trúng bia được không?',
        a: 'Hoàn toàn được! Giáo trình tại CLB được thiết kế từ cự ly gần (5m - 7m) với cung trợ lực nhẹ tay. Huấn luyện viên sẽ nắn từng tư thế đứng chữ T, cách khóa ngón tay và điểm đặt cung dưới cằm. 99% học viên đều bắn găm bia ngay trong buổi đầu tiên.'
      },
      {
        q: 'Khi đến học tôi cần tự chuẩn bị những gì?',
        a: 'Bạn không cần mua sắm đồ dùng đắt tiền. Toàn bộ cung, tên, giáp bảo hộ cánh tay và bảo hộ ngực đều được CLB trang bị sẵn miễn phí trong suốt khóa học. Bạn chỉ cần mặc quần áo thoải mái và mang giày thể thao.'
      },
      {
        q: 'Lịch học linh hoạt như thế nào nếu tôi bận ca kíp?',
        a: 'Sân mở cửa liên tục từ 15:00 đến 21:00 từ Thứ 2 đến Chủ Nhật. Khóa học tiêu chuẩn gồm 3 buổi/tuần, học viên có thể chủ động đăng ký ca tập phù hợp với lịch làm việc hoặc hoán đổi ca khi có việc bận đột xuất.'
      }
    ]
  },

  'boxing-kids-nguoi-lon': {
    badgeIcon: 'flame',
    badgeThemeClass: 'bg-red-100 text-red-800 border-red-200',
    themeGradient: 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
    asideBorderColor: 'border-red-500/30',
    instructorShortName: 'Thầy Việt',
    instructorAvatarBg: 'bg-red-100 border-red-300',
    instructorAvatarText: 'text-red-600',
    instructorRole: 'Chủ Nhiệm CLB Boxing',
    instructorBio: 'Huấn luyện viên Boxing giàu kinh nghiệm, chuyên đào tạo từ phong trào đến thi đấu cho cả trẻ em và người lớn. Thầy Việt luôn chú trọng kỹ thuật di chuyển bộ chân, đòn đấm chuẩn xác và sự an toàn tuyệt đối cho học viên.',
    heroCaption: 'Buổi tập Boxing hăng say tại sân khuôn viên Cơ Sở Bình Trưng',
    storyIcon: 'zap',
    storyIconColor: 'text-red-600',
    storyTitle: 'Cú Đấm Thép & Ý Chí Kiên Cường: Vượt Lên Giới Hạn Của Bản Thân',
    storyParagraphs: `
      <p>
        Tiếng găng đấm bồm bộp vào bao cát, tiếng thở dốc theo từng nhịp di chuyển né đòn (slip and roll), những giọt mồ hôi rơi xuống sàn tập... Boxing không phải là môn thể thao bạo lực, mà là một vũ điệu của tốc độ, phản xạ và sự dẻo dai.
      </p>
      <p>
        Tại CLB Boxing Cung Văn Hóa Lao Động Cơ Sở Bình Trưng của Thầy Nguyễn Thanh Việt, mỗi buổi tập kéo dài 90 phút là một buổi đốt calo toàn diện. Trẻ em học được sự can đảm, không lùi bước trước áp lực; người lớn giải tỏa sạch sẽ mọi bức bối, ức chế sau ngày làm việc mệt mỏi.
      </p>
    `,
    benefitBgGradient: 'from-red-50 to-rose-50',
    benefitBorderColor: 'border-red-100',
    benefit1Title: 'Đốt Cháy Mỡ Thừa & Tăng Thể Lực',
    benefit1Desc: 'Mỗi buổi tập đốt cháy từ 600 - 800 calo, giúp săn chắc cơ bắp toàn thân và tăng cường sức bền tim mạch vượt bậc.',
    benefit2Title: 'Phản Xạ Tự Vệ Thực Chiến',
    benefit2Desc: 'Hình thành phản xạ quan sát, né đòn và phản công linh hoạt, bảo vệ bản thân an toàn trong mọi tình huống.',
    benefit3Title: 'Xả Stress Cực Mạnh',
    benefit3Desc: 'Trút bỏ hoàn toàn áp lực công việc và học tập qua từng cú tung đòn chuẩn xác vào bao cát.',
    faqs: [
      {
        q: 'Lớp học có phân chia theo độ tuổi và trình độ không?',
        a: 'Có. CLB phân tách rõ ràng ca tập cho các bé thiếu nhi (Kids từ 4 - 12 tuổi) và ca tập dành cho thanh thiếu niên, người trưởng thành. Học viên mới vào sẽ được học riêng kỹ thuật di chuyển và tung đòn cơ bản trước khi ghép lớp.'
      },
      {
        q: 'Con gái hoặc phụ nữ có tập môn này được không?',
        a: 'Rất khuyến khích! Ngày nay có rất nhiều bạn nữ và chị em phụ nữ lựa chọn Boxing để giảm mỡ bụng, rèn luyện đôi chân săn chắc và trang bị kỹ năng tự vệ sống còn khi ra đường vào buổi tối.'
      },
      {
        q: 'Người lớn tập Boxing có sợ bị đau hoặc chấn thương mặt không?',
        a: 'Không. Đối với người mới và học viên phong trào, quá trình tập chủ yếu là đánh bao cát, tập đích đấm (pad work) cùng huấn luyện viên và rèn luyện thể lực tim mạch (Cardio). Bạn chỉ tham gia đối kháng (sparring) khi đã nắm vững kỹ thuật và có đầy đủ mũ bảo hiểm, bảo hộ hàm.'
      }
    ]
  },

  'yoga-tri-lieu': {
    badgeIcon: 'heart-pulse',
    badgeThemeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    themeGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    asideBorderColor: 'border-emerald-500/30',
    instructorShortName: 'Cô Liên',
    instructorAvatarBg: 'bg-emerald-100 border-emerald-300',
    instructorAvatarText: 'text-emerald-600',
    instructorRole: 'Chủ Nhiệm Lớp Yoga Trị Liệu',
    instructorBio: 'Giáo viên Yoga trị liệu giàu kinh nghiệm, nắm vững cấu trúc giải phẫu học cơ - xương - khớp. Cô Liên luôn tận tình chỉnh sửa từng góc đặt chân, tư thế thở cho từng học viên, giúp người lớn tuổi cảm thấy hoàn toàn an tâm và thư thái.',
    heroCaption: 'Không gian lớp Yoga Trị Liệu ấm cúng, thư thái tại phòng CN8 Lầu 2',
    storyIcon: 'sparkles',
    storyIconColor: 'text-emerald-600',
    storyTitle: 'Lắng Nghe Cơ Thể: Chữa Lành Từng Đốt Sống Sau Những Năm Tháng Làm Việc Vất Vả',
    storyParagraphs: `
      <p>
        Những cơn đau mỏi vai gáy âm ỉ sau nhiều giờ ngồi máy tính, những cơn nhức lưng buốt nhói mỗi khi cúi xuống bưng đồ nặng... Đó là những tín hiệu mà cơ thể đang cầu cứu bạn. Tại CLB Yoga Trị Liệu (Phòng CN8 Lầu 2) của Cô Nguyễn Thị Liên, chúng tôi mang đến một giải pháp phục hồi tự nhiên, không dùng thuốc.
      </p>
      <p>
        Khác với Yoga uốn dẻo thông thường, Yoga Trị Liệu tập trung vào việc căn chỉnh trục cột sống về trạng thái sinh lý tự nhiên, giải phóng các dây thần kinh bị chèn ép và tăng tuần hoàn máu nuôi dưỡng đĩa đệm. Học viên được tự do chọn tham gia bất kỳ ca nào trong 4 ca mỗi ngày mà không sợ mất buổi.
      </p>
    `,
    benefitBgGradient: 'from-emerald-50 to-teal-50',
    benefitBorderColor: 'border-emerald-100',
    benefit1Title: 'Giải Phóng Chèn Ép Dây Thần Kinh',
    benefit1Desc: 'Các bài tập kéo giãn nhẹ nhàng với dụng cụ hỗ trợ giúp giải tỏa áp lực đè nặng lên đĩa đệm cổ và thắt lưng.',
    benefit2Title: 'Tăng Độ Dẻo Khớp & Tuần Hoàn',
    benefit2Desc: 'Tăng tiết dịch bôi trơn ổ khớp gối, khớp háng và vai, đẩy lùi tình trạng khô khớp, lục cục khi vận động.',
    benefit3Title: '4 Khung Giờ Linh Hoạt Mỗi Ngày',
    benefit3Desc: 'Mở liên tục 4 ca (05:00, 07:30, 14:30, 18:30), học viên bận rộn ca kíp có thể tự do hoán đổi ca tập trong ngày.',
    faqs: [
      {
        q: 'Người bị đau khớp, thoái hóa hoặc cơ cứng có tập được không?',
        a: 'Hoàn toàn được! Yoga trị liệu khác biệt hoàn toàn với Yoga biểu diễn uốn dẻo. Các bài tập được tinh chỉnh tập trung vào kéo giãn nhẹ nhàng từng nhóm cơ, giải tỏa áp lực đè nén lên đĩa đệm và hỗ trợ phục hồi khớp với sự trợ giúp của gạch tập, dây đai chuyên dụng.'
      },
      {
        q: 'Tôi làm ca kíp có thể linh hoạt đổi ca tập trong ngày không?',
        a: 'Hoàn toàn linh hoạt! CLB mở liên tục 4 ca mỗi ngày (05:00 - 06:30, 07:30 - 09:00, 14:30 - 16:00 và 18:30 - 20:00). Học viên có thể chủ động tham gia bất kỳ ca nào phù hợp với lịch làm việc và gia đình trong ngày mà không mất buổi.'
      },
      {
        q: 'Đến lớp tôi cần tự chuẩn bị thảm tập không?',
        a: 'Tại phòng tập CN8 Lầu 2 đã có sẵn thảm tập sạch sẽ, gạch yoga, dây đai kháng lực. Học viên chỉ cần mặc trang phục co giãn, thoáng mát và mang theo khăn lau mồ hôi cùng bình nước cá nhân.'
      }
    ]
  },

  'cau-long': {
    badgeIcon: 'activity',
    badgeThemeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    themeGradient: 'from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700',
    asideBorderColor: 'border-blue-600/30',
    instructorShortName: 'Anh Hòa',
    instructorAvatarBg: 'bg-blue-100 border-blue-300',
    instructorAvatarText: 'text-blue-600',
    instructorRole: 'Chủ Nhiệm CLB Cầu Lông',
    instructorBio: 'Phụ trách điều phối đặt sân, tổ chức các giải đấu giao lưu đoàn viên công đoàn và trực tiếp giảng dạy các lớp bổ túc kỹ thuật từ căn bản đến nâng cao. Nhiệt tình, thân thiện và chu đáo với mọi hội nhóm.',
    heroCaption: 'Cụm nhà tập luyện 6 sân cầu lông thảm PVC tiêu chuẩn tại Cơ Sở Bình Trưng',
    storyIcon: 'zap',
    storyIconColor: 'text-blue-600',
    storyTitle: 'Tiếng Vợt Xé Gió: Sân Chơi Cầu Lông Đẳng Cấp Ngay Tại 245 Nguyễn Duy Trinh',
    storyParagraphs: `
      <p>
        Tiếng đập cầu "chát!" dứt khoát vang lên, những bước di chuyển thoăn thoắt trên mặt thảm PVC xanh ngắt và những pha cứu cầu ngoạn mục sát lưới... Cụm 6 sân cầu lông tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng luôn là điểm hẹn thể thao sôi động nhất khu vực từ sáng sớm tinh mơ đến tối muộn.
      </p>
      <p>
        Hệ thống đèn LED chống lóa chuyên dụng, độ bám sân cao cấp và trần nhà cao thoáng đãng mang lại trải nghiệm thi đấu hoàn hảo cho cả vận động viên phong trào lẫn hội nhóm doanh nghiệp giao lưu gắn kết.
      </p>
    `,
    benefitBgGradient: 'from-blue-50 to-sky-50',
    benefitBorderColor: 'border-blue-100',
    benefit1Title: 'Cụm 6 Sân Thảm PVC Chống Trơn',
    benefit1Desc: 'Mặt sàn êm ái, độ đàn hồi cao, giảm tối đa lực phản chấn lên khớp gối và cổ chân khi bật nhảy đập cầu.',
    benefit2Title: 'Mở Cửa 06:00 - 22:00 Suốt Tuần',
    benefit2Desc: 'Khung giờ hoạt động xuyên suốt kể cả ngày Lễ, Tết, đáp ứng trọn vẹn nhu cầu tập luyện của mọi ca làm việc.',
    benefit3Title: 'Chính Sách Ưu Đãi Công Đoàn',
    benefit3Desc: 'Mức giá thuê sân cố định theo tháng và lớp kèm kỹ thuật ưu đãi nhất dành cho đoàn viên và doanh nghiệp.',
    faqs: [
      {
        q: 'Sân có nhận đặt lịch cố định theo tháng cho hội nhóm, công ty không?',
        a: 'Có! Cụm 6 sân cầu lông ưu tiên ký hợp đồng giữ sân cố định theo tuần, theo tháng cho các cơ quan, đoàn thể, câu lạc bộ phong trào với mức giá ưu đãi công đoàn cạnh tranh nhất khu vực Bình Trưng.'
      },
      {
        q: 'Tại đây có lớp dạy kèm cầu lông cho người mới bắt đầu hoặc trẻ em không?',
        a: 'Có! Huấn luyện viên Đỗ Thanh Hòa trực tiếp đứng lớp các khóa bổ túc kỹ thuật từ vỡ lòng đến nâng cao: chuẩn hóa kỹ thuật cầm vợt, di chuyển bộ chân (footwork), đập cầu, bỏ nhỏ và chiến thuật đánh đôi hiệu quả.'
      },
      {
        q: 'Cơ sở có bãi đỗ xe và phòng thay đồ không?',
        a: 'Khuôn viên 245 Nguyễn Duy Trinh sở hữu bãi đỗ xe máy và ô tô rộng rãi, an ninh 24/7. Cụm sân có đầy đủ quầy nước giải khát, hệ thống quạt mát công nghiệp và khu vệ sinh, phòng thay đồ riêng biệt sạch sẽ.'
      }
    ]
  },

  'taekwondo': {
    badgeIcon: 'shield',
    badgeThemeClass: 'bg-red-100 text-red-800 border-red-200',
    themeGradient: 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
    asideBorderColor: 'border-red-500/30',
    instructorShortName: 'Thầy Danh',
    instructorAvatarBg: 'bg-red-100 border-red-300',
    instructorAvatarText: 'text-red-600',
    instructorRole: 'HLV Trưởng CLB Taekwondo',
    instructorBio: 'Huấn luyện viên giàu tâm huyết, từng đạt nhiều thứ hạng cao tại các giải vô địch võ thuật thành phố. Thầy Danh đặc biệt kiên nhẫn với các võ sinh nhỏ tuổi, chú trọng rèn luyện nhân cách, võ đạo đi đôi với rèn luyện thể lực và đòn thế tự vệ.',
    heroCaption: 'Lớp học Taekwondo tràn đầy khí thế tại sân Cung Văn Hóa Lao Động Cơ Sở Bình Trưng',
    storyIcon: 'award',
    storyIconColor: 'text-red-600',
    storyTitle: 'Võ Đạo Taekwondo: Kỷ Luật Bản Thân, Bản Lĩnh Trước Sóng Gió',
    storyParagraphs: `
      <p>
        Nhắc đến võ thuật, nhiều bậc phụ huynh thường lo ngại con mình sẽ trở nên hiếu chiến hoặc thô bạo. Nhưng tại lớp Taekwondo của <strong>Thầy Huỳnh Thanh Danh</strong> tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, bài học vỡ lòng đầu tiên mà mỗi võ sinh học được lại là <strong>chữ Lễ và sự tôn trọng</strong>.
      </p>
      <p>
        Từ tư thế đứng nghiêm chào huấn luyện viên, chỉnh đốn võ phục phẳng phiu đến cách thắt dải đai gọn gàng, từng chi tiết nhỏ rèn cho các em tính ngăn nắp, lễ phép và kỷ luật từ sớm. Trong từng đòn đá chẻ, đòn bay đá quét (dollyo chagi), tiếng hô "Tae-kwon!" dõng dạc vang lên xua tan đi sự nhút nhát rụt rè, bồi đắp cho trẻ lòng dũng cảm đối mặt với thử thách.
      </p>
      <p>
        Đặc biệt trong bối cảnh bạo lực học đường đang là nỗi trăn trở của nhiều gia đình, việc trang bị cho con một nền tảng võ thuật tự vệ thực chiến là món quà vô giá giúp con tự bảo vệ bản thân và che chở cho bạn bè xung quanh.
      </p>
    `,
    benefitBgGradient: 'from-red-50 to-rose-50',
    benefitBorderColor: 'border-red-100',
    benefit1Title: 'Khung Xương Chắc & Tăng Chiều Cao',
    benefit1Desc: 'Các đòn đá liên hoàn kích thích sụn tiếp hợp ở đầu xương dài phát triển tối đa trong độ tuổi vàng của trẻ.',
    benefit2Title: 'Tự Vệ Thông Minh & Phản Xạ Nhanh',
    benefit2Desc: 'Trang bị kỹ năng giải thoát, né đòn và hóa giải nguy hiểm khi gặp các tình huống xấu ngoài đường.',
    benefit3Title: 'Tự Tin & Điềm Tĩnh Nội Tâm',
    benefit3Desc: 'Dẹp bỏ tính ỷ lại hay rụt rè trước đám đông, học cách kiểm soát cảm xúc và kiên trì không bỏ cuộc.',
    faqs: [
      {
        q: 'Trẻ từ mấy tuổi có thể bắt đầu học Taekwondo?',
        a: 'Lớp tiếp nhận các bé từ 5 tuổi trở lên. Giáo án lứa tuổi mầm non và tiểu học được thiết kế vui tươi, chú trọng tính linh hoạt, thăng bằng và phản xạ cơ bản, tuyệt đối an toàn.'
      },
      {
        q: 'Học viên mới chưa có võ phục thì đến lớp mặc gì?',
        a: 'Buổi đầu tiên học viên chỉ cần mặc quần áo thể thao thoải mái. Sau đó Thầy Danh sẽ đo size và cung cấp võ phục Taekwondo tiêu chuẩn của CLB.'
      },
      {
        q: 'Học viên có được thi thăng cấp đai định kỳ không?',
        a: 'Có. CLB tổ chức thi lên đai định kỳ (Đai trắng, vàng, xanh lá, xanh dương, đỏ, đen) theo chuẩn của Liên đoàn Taekwondo TP. Hồ Chí Minh với chứng nhận chính thức.'
      }
    ]
  },

  'nhay-hien-dai-thieu-nhi': {
    badgeIcon: 'music',
    badgeThemeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    themeGradient: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    asideBorderColor: 'border-purple-500/30',
    instructorShortName: 'Thầy Hiền',
    instructorAvatarBg: 'bg-purple-100 border-purple-300',
    instructorAvatarText: 'text-purple-600',
    instructorRole: 'Biên Đạo Múa & HLV Nhảy Hiện Đại',
    instructorBio: 'Biên đạo múa trẻ trung, sáng tạo, giàu kinh nghiệm giảng dạy vũ đạo cho thiếu nhi và thanh thiếu niên. Thầy Hiền luôn biết cách truyền cảm hứng, biến mỗi buổi tập thành sân chơi âm nhạc đầy hào hứng và tiếng cười.',
    heroCaption: 'Không gian tập nhảy sôi động của các bạn nhỏ tại Cơ Sở Bình Trưng',
    storyIcon: 'sparkles',
    storyIconColor: 'text-purple-600',
    storyTitle: 'Khi Âm Nhạc Hòa Cùng Bước Nhảy: Rời Xa Màn Hình Điện Thoại',
    storyParagraphs: `
      <p>
        Sau những giờ ngồi gò lưng bên bàn học hay say mê bên màn hình điện thoại, đôi mắt các em cần được nhìn rộng, đôi chân cần được nhún nhảy tự do. Lớp <strong>Nhảy Hiện Đại Thiếu Nhi</strong> của <strong>Thầy Trần Trung Hiền</strong> mang đến một nguồn năng lượng bùng nổ, kéo các em trở về với niềm vui vận động thuần túy.
      </p>
      <p>
        Từng nhịp bass sôi động của các bản nhạc thiếu nhi quốc tế và Kpop thịnh hành kích hoạt toàn bộ cơ thể. Không còn sự gò bó hay áp lực điểm số, các em được tự do thể hiện cá tính qua từng động tác đánh hông, vung tay và xoay người dứt khoát.
      </p>
      <p>
        Nhiều phụ huynh chia sẻ: chỉ sau vài tuần tham gia, các bé từ chỗ nhút nhát, ít nói đã trở nên hoạt bát, tự tin nhảy múa trong các buổi liên hoan trường lớp và luôn ngóng chờ đến buổi tập tại Cung Văn Hóa.
      </p>
    `,
    benefitBgGradient: 'from-purple-50 to-pink-50',
    benefitBorderColor: 'border-purple-100',
    benefit1Title: 'Giải Phóng Năng Lượng & Thể Lực',
    benefit1Desc: 'Đốt cháy mỡ thừa, kích thích hệ tim mạch hoạt động bền bỉ, đẩy lùi hiệu quả nguy cơ béo phì học đường.',
    benefit2Title: 'Cảm Thụ Âm Nhạc & Nhịp Điệu',
    benefit2Desc: 'Phát triển bán cầu não phải, nâng cao khả năng cảm thụ nghệ thuật và tính sáng tạo chuyển động.',
    benefit3Title: 'Tự Tin Tỏa Sáng Trước Đám Đông',
    benefit3Desc: 'Loại bỏ hoàn toàn rụt rè, xây dựng phong thái biểu diễn dạn dĩ và tinh thần phối hợp đội hình cùng bạn bè.',
    faqs: [
      {
        q: 'Bé chưa từng nhảy bao giờ và rất nhút nhát có theo kịp không?',
        a: 'Hoàn toàn theo kịp! Các bài nhảy được chia nhỏ từng 8 nhịp đếm từ chậm đến nhanh. Thầy Hiền luôn kèm cặp ân cần và tạo không khí vui nhộn giúp bé hòa nhập tự nhiên.'
      },
      {
        q: 'Cần chuẩn bị trang phục và giày tập như thế nào?',
        a: 'Các bé chỉ cần mặc quần áo thun co giãn thoải mái, thấm mồ hôi và mang theo một đôi giày sneaker hoặc giày thể thao mềm êm chân.'
      },
      {
        q: 'Các bé có được tham gia biểu diễn quay video kỷ niệm không?',
        a: 'Có! Cuối mỗi bài dựng, CLB sẽ tổ chức quay video clip vũ đạo nhóm làm kỷ niệm cho các em và biểu diễn trong các ngày hội của Cung Văn Hóa.'
      }
    ]
  },

  'yoga-an-do': {
    badgeIcon: 'flower-2',
    badgeThemeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    themeGradient: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
    asideBorderColor: 'border-amber-500/30',
    instructorShortName: 'Thầy Shashi',
    instructorAvatarBg: 'bg-amber-100 border-amber-300',
    instructorAvatarText: 'text-amber-600',
    instructorRole: 'Chuyên Gia Yoga Cổ Truyền Ấn Độ',
    instructorBio: 'Giảng viên Yoga quốc tế đến từ Ấn Độ, sở hữu bề dày kiến thức chuyên sâu về triết lý Yoga cổ truyền, kỹ thuật điều hòa hơi thở Pranayama và thiền định chữa lành. Tận tâm, am hiểu cơ thể và phương pháp sư phạm trực quan.',
    heroCaption: 'Thầy Shashi Kant Pramanik đang hướng dẫn tư thế định hình Asana cho học viên',
    storyIcon: 'sun',
    storyIconColor: 'text-amber-600',
    storyTitle: 'Chạm Vào Cội Nguồn Yoga Cổ Truyền: Hơi Thở & Năng Lượng Vũ Trụ',
    storyParagraphs: `
      <p>
        Giữa lòng đô thị hối hả và ô nhiễm, cơ thể chúng ta thường xuyên bị rơi vào trạng thái căng thẳng mạn tính: hơi thở nông, tim đập nhanh và tâm trí luôn bị bủa vây bởi những lo toan cuộc sống. Tìm về với <strong>CLB Yoga Ấn Độ</strong> tại Cơ Sở Bình Trưng là tìm về với cội nguồn tinh khiết nhất của trường phái Yoga cổ điển.
      </p>
      <p>
        Dưới sự chỉ dẫn trực tiếp của <strong>Thầy Shashi Kant Pramanik</strong>, mỗi buổi sáng từ 08:00 đến 09:10 là một hành trình tái sinh nguồn sinh lực. Bạn sẽ được hướng dẫn cặn kẽ kỹ thuật thở Pranayama — chìa khóa kiểm soát năng lượng sinh học (Prana) giúp nạp đầy oxy tinh khiết vào từng tế bào phổi và não bộ.
      </p>
      <p>
        Từng tư thế Asana không nhằm mục đích phô diễn độ uốn dẻo, mà là sự lắng đọng tĩnh tại để các khớp xương tự phục hồi, khí huyết lưu thông thông suốt và tâm hồn đạt đến trạng thái an lạc tĩnh lặng.
      </p>
    `,
    benefitBgGradient: 'from-amber-50 to-orange-50',
    benefitBorderColor: 'border-amber-100',
    benefit1Title: 'Làm Sạch Phổi & Cân Bằng Khí',
    benefit1Desc: 'Kỹ thuật Pranayama cổ truyền giúp mở rộng dung tích phổi, hỗ trợ phục hồi sau viêm đường hô hấp.',
    benefit2Title: 'Ổn Định Huyết Áp & Giảm Stress',
    benefit2Desc: 'Kích hoạt hệ thần kinh đối giao cảm, hạ mức hormone cortisol căng thẳng, mang lại giấc ngủ ngon sâu.',
    benefit3Title: 'Căn Chỉnh Trục Cột Sống An Toàn',
    benefit3Desc: 'Kéo giãn các nhóm cơ sâu quanh cột sống, phòng ngừa thoát vị đĩa đệm và thoái hóa xương khớp.',
    faqs: [
      {
        q: 'Thầy là người Ấn Độ thì giao tiếp trong lớp như thế nào?',
        a: 'Thầy Shashi giảng dạy bằng động tác thị phạm trực quan rất rõ ràng, kết hợp các khẩu lệnh tiếng Việt và tiếng Anh quen thuộc, đồng thời luôn có trợ giảng hỗ trợ học viên mới.'
      },
      {
        q: 'Người cứng người, chưa từng tập Yoga có theo được không?',
        a: 'Hoàn toàn được! Triết lý Yoga Ấn Độ nhấn mạnh vào việc lắng nghe cơ thể chính mình. Thầy Shashi sẽ hướng dẫn các biến thể dễ để người mới thích nghi an toàn.'
      },
      {
        q: 'Lớp học có thảm tập và dụng cụ sẵn không?',
        a: 'Phòng chuyên đề Yoga tại cơ sở đã được trang bị thảm tập, gạch tập và dây đai vệ sinh sạch sẽ mỗi ngày.'
      }
    ]
  },

  'bong-ro': {
    badgeIcon: 'trophy',
    badgeThemeClass: 'bg-orange-100 text-orange-800 border-orange-200',
    themeGradient: 'from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700',
    asideBorderColor: 'border-orange-500/30',
    instructorShortName: 'Thầy Thịnh',
    instructorAvatarBg: 'bg-orange-100 border-orange-300',
    instructorAvatarText: 'text-orange-600',
    instructorRole: 'HLV Trưởng CLB Bóng Rổ',
    instructorBio: 'Huấn luyện viên bóng rổ năng động, giàu kinh nghiệm đào tạo phong trào và năng khiếu cho học sinh tiểu học, THCS và THPT. Phương pháp huấn luyện bài bản, hiện đại, chú trọng kỹ năng cá nhân và tư duy chiến thuật đồng đội.',
    heroCaption: 'Pha tranh chấp bóng nảy lửa tại sân bóng rổ ngoài trời 245 Nguyễn Duy Trinh',
    storyIcon: 'flame',
    storyIconColor: 'text-orange-600',
    storyTitle: 'Tiếng Đập Bóng Trên Mặt Sân: Nơi Khát Khao Tuổi Trẻ Bùng Cháy',
    storyParagraphs: `
      <p>
        Tiếng bóng nảy bình bịch trên mặt sân bê tông tiêu chuẩn, tiếng giày rít sắc gọn và tiếng lưới rung lên giòn giã sau một cú ném 3 điểm hoàn hảo... Đó là nhịp sống quen thuộc mỗi buổi chiều tại <strong>CLB Bóng Rổ Cung Văn Hóa Lao Động Cơ Sở Bình Trưng</strong>.
      </p>
      <p>
        Dưới sự dẫn dắt của <strong>Thầy Nguyễn Ngọc Thịnh</strong>, các em học sinh không chỉ được tập luyện kỹ năng nhồi bóng (dribble), chuyền bóng (pass) và lên rổ (layup) chuẩn xác, mà còn học được tinh thần đồng đội: biết quan sát khoảng trống của bạn, biết hi sinh cơ hội cá nhân vì thắng lợi chung của cả đội.
      </p>
      <p>
        Bóng rổ là "môn thể thao vàng" kích thích chiều cao mạnh mẽ nhất nhờ các pha rướn người tranh bóng và bật nhảy liên tục, giúp các em giải tỏa áp lực thi cử và phát triển thể chất vượt trội so với bạn bè cùng trang lứa.
      </p>
    `,
    benefitBgGradient: 'from-orange-50 to-amber-50',
    benefitBorderColor: 'border-orange-100',
    benefit1Title: 'Bứt Phá Chiều Cao Tối Đa',
    benefit1Desc: 'Lực bật nhảy liên tục kích thích các đĩa tăng trưởng của xương ống chân phát triển dài hơn.',
    benefit2Title: 'Tư Duy Chiến Thuật & Phản Xạ Cực Nhanh',
    benefit2Desc: 'Rèn luyện khả năng quan sát nhạy bén, đưa ra quyết định chuyền hay ném chỉ trong 1/10 giây.',
    benefit3Title: 'Gắn Kết Đồng Đội & Bản Lĩnh Thi Đấu',
    benefit3Desc: 'Học cách chấp nhận thất bại để vươn lên, tinh thần fair-play cao thượng và tôn trọng đối thủ.',
    faqs: [
      {
        q: 'Học viên nữ có tham gia lớp bóng rổ được không?',
        a: 'Rất hoan nghênh! CLB có nhiều bạn nữ tham gia rèn luyện thể lực và phối hợp bóng rất tốt trong các bài tập nhóm.'
      },
      {
        q: 'Có cần tự mua bóng mang theo không?',
        a: 'Không cần. Sân bóng rổ đã trang bị sẵn bóng tập tiêu chuẩn theo lứa tuổi. Học viên chỉ cần mang giày bóng rổ hoặc giày thể thao êm chân.'
      },
      {
        q: 'Lịch tập 6 buổi/tuần có bắt buộc đi đủ hết không?',
        a: 'Sân mở từ Thứ 3 đến Chủ Nhật. Phụ huynh có thể linh hoạt sắp xếp cho con tập 2-3 buổi/tuần phù hợp với lịch học văn hóa ở trường.'
      }
    ]
  },

  'mua-dan-vu': {
    badgeIcon: 'heart',
    badgeThemeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    themeGradient: 'from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700',
    asideBorderColor: 'border-rose-500/30',
    instructorShortName: 'Cô Liên',
    instructorAvatarBg: 'bg-rose-100 border-rose-300',
    instructorAvatarText: 'text-rose-600',
    instructorRole: 'Chủ Nhiệm CLB Dân Vũ & Dân Gian',
    instructorBio: 'Nghệ nhân múa giàu tâm huyết, phụ trách phong trào văn nghệ quần chúng tại địa phương nhiều năm liền. Cô Liên luôn hòa nhã, ân cần hướng dẫn từng bước chân, thế tay cho học viên mọi lứa tuổi, đặc biệt là phụ nữ và người trung niên.',
    heroCaption: 'Tiết mục múa nón duyên dáng của CLB Dân Vũ tại Cung Văn Hóa Lao Động Bình Trưng',
    storyIcon: 'music-2',
    storyIconColor: 'text-rose-600',
    storyTitle: 'Những Điệu Múa Rộn Ràng Đón Nắng Sớm: Sống Vui, Sống Khỏe, Sống Ý Nghĩa',
    storyParagraphs: `
      <p>
        Mỗi sáng từ 07:30 đến 09:00, không gian sảnh sinh hoạt Cung Văn Hóa Lao Động Cơ Sở Bình Trưng lại rộn ràng tiếng nhạc dân tộc ba miền. Những tà áo dài thướt tha, những chiếc nón lá, quạt lụa xòe bay theo nhịp múa uyển chuyển của các cô, các chị.
      </p>
      <p>
        Dưới sự dìu dắt tận tụy của <strong>Cô Võ Thị Kim Liên</strong>, lớp <strong>Múa Dân Vũ & Dân Gian</strong> không chỉ là nơi học múa, mà là một mái nhà ấm áp của những nụ cười tuổi vàng. Từng bước đi nhón chân, từng động tác xoay eo nhẹ nhàng giúp cải thiện khả năng giữ thăng bằng, đánh tan cảm giác cô đơn và mang lại sự tươi trẻ trong tâm hồn.
      </p>
      <p>
        Với mức học phí an sinh công đoàn chỉ <strong>100.000 VNĐ/tháng</strong>, lớp học là điểm hẹn gắn kết nghĩa tình xóm giềng, nơi các bà, các mẹ tìm thấy niềm hạnh phúc bình dị mỗi ngày.
      </p>
    `,
    benefitBgGradient: 'from-rose-50 to-pink-50',
    benefitBorderColor: 'border-rose-100',
    benefit1Title: 'Lưu Giữ Nét Đẹp Văn Hóa Dân Tộc',
    benefit1Desc: 'Tiếp cận các điệu múa truyền thống: múa quạt, múa nón, dân vũ Tây Nguyên và ba miền duyên dáng.',
    benefit2Title: 'Dưỡng Sinh Xương Khớp & Huyết Áp',
    benefit2Desc: 'Vận động uyển chuyển vừa sức, giúp các khớp gối linh hoạt, tăng dung tích phổi và điều hòa huyết áp.',
    benefit3Title: 'Giao Lưu Sống Vui Khỏe Chan Hòa',
    benefit3Desc: 'Môi trường sinh hoạt tập thể ấm áp, xóa tan cảm giác buồn chán tuổi già và kết giao thêm nhiều bạn hữu.',
    faqs: [
      {
        q: 'Người lớn tuổi, chân tay cứng có học múa được không?',
        a: 'Hoàn toàn được! Các bài dân vũ được thiết kế với nhịp điệu vừa phải, bước chân chậm rãi và có ghế nghỉ ngơi giữa buổi.'
      },
      {
        q: 'Học phí 100.000 VNĐ/tháng có đúng không?',
        a: 'Chính xác 100%! Đây là lớp học an sinh xã hội phi lợi nhuận của Cung Văn Hóa Lao Động phục vụ phụ nữ và người cao tuổi địa phương.'
      },
      {
        q: 'CLB có tham gia biểu diễn văn nghệ phong trào không?',
        a: 'Có. Đội múa thường xuyên đại diện cơ sở tham gia biểu diễn tại các ngày hội công nhân viên chức và các sự kiện đoàn thể của TP.'
      }
    ]
  },

  'yoga-song-khoe-1': {
    badgeIcon: 'sunrise',
    badgeThemeClass: 'bg-teal-100 text-teal-800 border-teal-200',
    themeGradient: 'from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700',
    asideBorderColor: 'border-teal-500/30',
    instructorShortName: 'Cô Lang',
    instructorAvatarBg: 'bg-teal-100 border-teal-300',
    instructorAvatarText: 'text-teal-600',
    instructorRole: 'Chủ Nhiệm Lớp Yoga Sống Khỏe Sáng',
    instructorBio: 'Giáo viên Yoga lâu năm với phong cách giảng dạy tỉ mỉ, đôn hậu và chu đáo. Cô Lang thấu hiểu sâu sắc thể trạng của người lao động và phụ nữ trung niên, luôn cá nhân hóa động tác để học viên đạt hiệu quả trị liệu cao nhất.',
    heroCaption: 'Buổi tập Yoga đón bình minh tinh khôi tại phòng tập lầu 1 Cơ Sở Bình Trưng',
    storyIcon: 'sparkle',
    storyIconColor: 'text-teal-600',
    storyTitle: 'Đón Bình Minh Cùng Yoga: 60 Phút Nạp Đầy Năng Lượng Cho Cả Ngày Dài',
    storyParagraphs: `
      <p>
        Khi phố phường Bình Trưng còn chìm trong làn sương sớm và tiếng còi xe chưa vội vã, phòng tập lầu 1 Cung Văn Hóa đã ngập tràn ánh sáng ấm áp. Tiếng thở êm ái cùng những động tác vươn người khoan thai của lớp <strong>Yoga Sống Khỏe Ca Sáng (06:00 - 07:00)</strong> mở ra một ngày mới đầy sức sống.
      </p>
      <p>
        Dưới sự chỉ dẫn ân cần của <strong>Cô Khổng Thị Lang</strong>, bài tập chào mặt trời nhẹ nhàng đánh thức các khớp xương bị co cứng sau một đêm nằm dài. Từng nhịp hít sâu - thở chậm đưa oxy tràn vào buồng phổi, giải tỏa hoàn toàn cảm giác uể oải, mỏi vai gáy.
      </p>
      <p>
        Chỉ với 60 phút mỗi buổi vào các ngày Thứ 2 - 4 - 6, bạn sẽ cảm nhận rõ rệt nguồn năng lượng tươi mới, tinh thần minh mẫn sẵn sàng đối mặt với áp lực công việc của cả ngày.
      </p>
    `,
    benefitBgGradient: 'from-teal-50 to-emerald-50',
    benefitBorderColor: 'border-teal-100',
    benefit1Title: 'Đánh Thức Trao Đổi Chất Sớm',
    benefit1Desc: 'Kích thích tuần hoàn máu và hệ tiêu hóa hoạt động tối ưu ngay từ đầu ngày, giúp da dẻ hồng hào tươi tắn.',
    benefit2Title: 'Học Phí Ưu Đãi Chỉ 300.000 đ/tháng',
    benefit2Desc: 'Mức phí an sinh của Cung Văn Hóa Lao Động giúp mọi người lao động dễ dàng duy trì việc tập đều đặn hàng năm.',
    benefit3Title: 'Cải Thiện Tư Thế & Chống Gù Lưng',
    benefit3Desc: 'Kéo mở rộng lồng ngực và làm thẳng cột sống, khắc phục tình trạng đau mỏi lưng do thói quen sinh hoạt sai.',
    faqs: [
      {
        q: 'Tập xong lúc 07:00 có kịp giờ đi làm cơ quan không?',
        a: 'Rất kịp! Cơ sở có phòng thay đồ sạch sẽ. Sau khi tập xong 07:00, học viên hoàn toàn thoải mái chuẩn bị đồ ăn sáng và đến nơi làm việc trước 08:00.'
      },
      {
        q: 'Người có tiền sử đau thắt lưng có theo được lớp không?',
        a: 'Rất phù hợp! Cô Lang luôn hướng dẫn các tư thế bảo vệ đĩa đệm thắt lưng, dùng thảm êm và gạch đỡ an toàn.'
      },
      {
        q: 'Có cần mang theo thảm tập cá nhân không?',
        a: 'Phòng tập lầu 1 đã trang bị đầy đủ thảm tập sạch sẽ. Học viên có thể tự mang khăn trải thảm cá nhân nếu thích.'
      }
    ]
  },

  'yoga-song-khoe-2': {
    badgeIcon: 'moon',
    badgeThemeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    themeGradient: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
    asideBorderColor: 'border-indigo-500/30',
    instructorShortName: 'Cô Bảy',
    instructorAvatarBg: 'bg-indigo-100 border-indigo-300',
    instructorAvatarText: 'text-indigo-600',
    instructorRole: 'Chủ Nhiệm Lớp Yoga Sống Khỏe Chiều Tối',
    instructorBio: 'Giáo viên Yoga giàu nhiệt huyết, tận tâm và gần gũi. Cô Bảy chuyên các bài tập giải tỏa căng thẳng thần kinh và phục hồi cơ bắp dành riêng cho người lao động, nhân viên văn phòng sau một ngày làm việc vất vả.',
    heroCaption: 'Không gian thư giãn xua tan mệt mỏi ca tối tại phòng sinh hoạt lầu 1',
    storyIcon: 'feather',
    storyIconColor: 'text-indigo-600',
    storyTitle: 'Khép Lại Ngày Dài Bận Rộn: Khi Thân Thể Được Thả Lỏng Hoàn Toàn',
    storyParagraphs: `
      <p>
        Sau 8 tiếng ngồi dán mắt vào màn hình máy tính hay làm việc miệt mài trong nhà xưởng, vai bạn nặng trĩu, hai mắt mỏi nhừ và cột sống như muốn biểu tình. Đừng vội mang sự mệt mỏi ấy về nhà để rồi cáu kỉnh với người thân hay nằm lướt điện thoại trong mệt mỏi.
      </p>
      <p>
        Hãy dành 60 phút quý giá từ 18:00 đến 19:00 (Thứ 3 - 5 - 7) tại <strong>CLB Yoga Sống Khỏe 2</strong> của <strong>Cô Nguyễn Thị Bảy</strong>. Trong không gian êm dịu, tiếng nhạc thiền nhẹ nhàng cùng những bài tập vặn xoắn, kéo giãn mềm mại sẽ nhẹ nhàng xoa bóp từng thớ cơ căng cứng.
      </p>
      <p>
        Khi tư thế xác chết (Savasana) kết thúc, bạn sẽ bước ra khỏi phòng tập với cơ thể nhẹ bẫng, tâm trí an yên và sẵn sàng đón nhận một giấc ngủ sâu trọn vẹn không mộng mị.
      </p>
    `,
    benefitBgGradient: 'from-indigo-50 to-blue-50',
    benefitBorderColor: 'border-indigo-100',
    benefit1Title: 'Trút Sạch Nhức Mỏi Sau Giờ Tan Tầm',
    benefit1Desc: 'Giải phóng chèn ép các đốt sống cổ và thắt lưng do ngồi lâu hoặc đứng nhiều suốt cả ngày dài.',
    benefit2Title: 'Xua Tan Chứng Mất Ngủ Mạn Tính',
    benefit2Desc: 'Kỹ thuật thở âm dương giúp điều hòa nhịp tim, xoa dịu hệ thần kinh căng thẳng, đem lại giấc ngủ sâu tự nhiên.',
    benefit3Title: 'Học Phí Tiết Kiệm 300.000 đ/tháng',
    benefit3Desc: 'Mức học phí công đoàn hỗ trợ tối đa người lao động, thủ tục đăng ký xếp lớp nhanh gọn qua Zalo Cô Bảy.',
    faqs: [
      {
        q: 'Nếu đi làm về trễ có được vào lớp muộn một chút không?',
        a: 'Được. Lớp bắt đầu lúc 18:00. Nếu bị kẹt xe nhẹ, học viên có thể vào phòng nhẹ nhàng tự khởi động và theo tiếp bài tập cùng cô.'
      },
      {
        q: 'Lớp học phù hợp cho những ai?',
        a: 'Rất lý tưởng cho công nhân viên chức, người làm việc văn phòng, chị em phụ nữ nội trợ muốn giải tỏa căng thẳng sau giờ làm việc.'
      },
      {
        q: 'Đăng ký học như thế nào để bắt đầu sớm?',
        a: 'Chỉ cần gọi hoặc nhắn tin Zalo Cô Bảy theo số 0767 119 854 để cô tư vấn xếp lớp ngay trong tuần.'
      }
    ]
  },

  'dance-kids-ballet-kids': {
    badgeIcon: 'sparkles',
    badgeThemeClass: 'bg-pink-100 text-pink-800 border-pink-200',
    themeGradient: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
    asideBorderColor: 'border-pink-500/30',
    instructorShortName: 'Cô Trâm',
    instructorAvatarBg: 'bg-pink-100 border-pink-300',
    instructorAvatarText: 'text-pink-600',
    instructorRole: 'Biên Đạo & HLV Múa Ballet - Dance Kids',
    instructorBio: 'Giảng viên múa Ballet và vũ đạo thiếu nhi được đào tạo chuyên nghiệp, giàu kinh nghiệm nuôi dưỡng năng khiếu cho các bé từ 4 đến 15 tuổi. Cô Trâm dịu dàng, chu đáo, giúp các em sửa từng dáng đi, nét mặt để hình thành thần thái tự tin quý phái.',
    heroCaption: 'Các bé lớp Dance Kids & Ballet Kids đang luyện tập uốn dẻo tại phòng 9 lầu 2',
    storyIcon: 'heart-handshake',
    storyIconColor: 'text-pink-600',
    storyTitle: 'Những Bước Chân Kiễng Đầu Tiên: Ươm Mầm Giấc Mơ Nghệ Thuật Cho Bé Yêu',
    storyParagraphs: `
      <p>
        Bạn có nhận thấy con gái mình thường say mê ngắm nhìn những nàng công chúa thiên nga trên tivi và bắt chước nhón gót xoay tròn theo điệu nhạc? Tại <strong>CLB Dance Kids & Ballet Kids (Phòng 9 Lầu 2)</strong>, <strong>Cô Nguyễn Ngọc Mai Trâm</strong> sẽ chắp cánh cho giấc mơ nghệ thuật ấy thành hiện thực.
      </p>
      <p>
        Ballet và Dance Kids không chỉ đơn thuần là bộ môn múa, mà là nghệ thuật rèn luyện hình thể tuyệt vời nhất trong giai đoạn phát triển đầu đời của trẻ. Từng bài tập ép dẻo thanh gióng, giương cánh tay và giữ lưng thẳng như một nhánh hoa giúp nắn chỉnh vóc dáng của bé ngay từ thuở nhỏ.
      </p>
      <p>
        Các tật xấu thường gặp ở học sinh như gù lưng, rụt cổ hay chân đi hình chữ bát (chân vòng kiềng) sẽ được khắc phục triệt để, thay vào đó là phong thái kiêu sa, tự tin và duyên dáng trong từng bước đi.
      </p>
    `,
    benefitBgGradient: 'from-pink-50 to-rose-50',
    benefitBorderColor: 'border-pink-100',
    benefit1Title: 'Chỉnh Dáng Chuẩn & Thon Gọn Khung Xương',
    benefit1Desc: 'Sửa tật gù lưng, giữ thẳng trục cột sống, rèn dáng đi thanh thoát nhẹ nhàng như những vũ công nhí.',
    benefit2Title: 'Rèn Luyện Tính Kiên Trì & Tỉ Mỉ',
    benefit2Desc: 'Mỗi động tác Ballet đòi hỏi sự kiên nhẫn và chăm chút, rèn cho trẻ tính cách chỉn chu và cẩn thận.',
    benefit3Title: 'Tự Tin Biểu Diễn & Tỏa Sáng',
    benefit3Desc: 'Bé được hòa mình vào tập thể vui tươi, không còn e dè nhút nhát và sẵn sàng biểu diễn tự tin trước đám đông.',
    faqs: [
      {
        q: 'Bé 4 tuổi đã có thể bắt đầu học Ballet được chưa?',
        a: 'Hoàn toàn được! Lớp Pre-Ballet dành cho các bé từ 4-6 tuổi chú trọng vận động cảm thụ âm nhạc nhẹ nhàng và uốn dẻo tự nhiên.'
      },
      {
        q: 'Cần mua trang phục múa và giày Ballet ở đâu?',
        a: 'Cô Trâm sẽ hướng dẫn phụ huynh địa chỉ chọn mua váy múa tutu và giày Ballet mềm đúng chuẩn, thoáng mát với chi phí hợp lý.'
      },
      {
        q: 'Lớp học có những ngày nào trong tuần?',
        a: 'Lớp mở vào các buổi chiều tối từ 17:00 đến 21:00. Phụ huynh liên hệ Cô Trâm để chọn ca và ngày học phù hợp nhất cho bé.'
      }
    ]
  },

  'patin': {
    badgeIcon: 'wind',
    badgeThemeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    themeGradient: 'from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700',
    asideBorderColor: 'border-cyan-500/30',
    instructorShortName: 'Cô Ân',
    instructorAvatarBg: 'bg-cyan-100 border-cyan-300',
    instructorAvatarText: 'text-cyan-600',
    instructorRole: 'HLV Trưởng CLB Trượt Patin',
    instructorBio: 'Huấn luyện viên trượt Patin chuyên nghiệp, tận tâm và giàu kinh nghiệm với trẻ nhỏ. Cô Ân luôn đặt yếu tố an toàn lên hàng đầu, nắm vững kỹ thuật thăng bằng và phương pháp sư phạm tâm lý giúp trẻ vượt qua nỗi sợ ngã chỉ sau 1 buổi.',
    heroCaption: 'Khu vực sân trượt Patin có mái che an toàn tại 245 Nguyễn Duy Trinh',
    storyIcon: 'zap',
    storyIconColor: 'text-cyan-600',
    storyTitle: 'Chinh Phục Những Bánh Xe: Đứng Dậy Sau Mỗi Lần Vấp Ngã',
    storyParagraphs: `
      <p>
        Nhìn các bạn nhỏ lướt đi thoăn thoắt trên đôi giày gắn hàng bánh xe xoay tít với nụ cười rạng rỡ, nhiều phụ huynh vừa háo hức vừa lo lắng sợ con bị trầy xước té ngã. Nhưng tại <strong>CLB Trượt Patin của Cô Hồ Kim Ân</strong> ở sân có mái che Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, bài học đầu tiên không phải là trượt nhanh, mà là <strong>học cách ngã an toàn và tự đứng dậy</strong>.
      </p>
      <p>
        Khi được trang bị đầy đủ bộ giáp bảo vệ đầu gối, cùi chỏ, cổ tay và nón bảo hiểm chuẩn, các em hiểu rằng ngã không hề đáng sợ. Cảm giác vượt qua sự sợ hãi ban đầu, đứng vững trên đôi giày bánh xe và lướt đi trong làn gió mát là bài học quý giá về lòng dũng cảm.
      </p>
      <p>
        Trượt Patin kích thích hệ thống tiền đình của não bộ phát triển vượt bậc, giúp trẻ phản xạ cực kỳ linh hoạt và có một đôi chân săn chắc, khỏe khoắn.
      </p>
    `,
    benefitBgGradient: 'from-cyan-50 to-blue-50',
    benefitBorderColor: 'border-cyan-100',
    benefit1Title: 'Phát Triển Hệ Thống Tiền Đình & Thăng Bằng',
    benefit1Desc: 'Phối hợp nhịp nhàng giữa mắt quan sát, khớp hông và cơ bắp bàn chân, nâng cao phản xạ vận động cơ thể.',
    benefit2Title: 'Rèn Lòng Dũng Cảm & Tự Lập',
    benefit2Desc: 'Trẻ học cách tự đứng lên sau cú vấp ngã, không mè nheo ỷ lại, hình thành bản lĩnh kiên cường trước khó khăn.',
    benefit3Title: 'Sân Tập Có Mái Che Tuyệt Đối An Toàn',
    benefit3Desc: 'Mặt sàn bằng phẳng tiêu chuẩn, có mái che che mưa nắng, đảm bảo buổi tập diễn ra liên tục không gián đoạn.',
    faqs: [
      {
        q: 'Chưa có giày trượt thì buổi đầu đến lớp có được mượn không?',
        a: 'CLB có sẵn giày trượt và trọn bộ bảo hộ cho bé mang thử trong buổi trải nghiệm đầu tiên để kiểm tra độ thích ứng trước khi mua sắm.'
      },
      {
        q: 'Tập Patin có dễ bị chấn thương hay gãy chân không?',
        a: 'Tuyệt đối an toàn nếu tuân thủ đúng quy tắc: 100% học viên đều phải đeo giáp bảo hộ 6 món và mũ bảo hiểm, có HLV theo sát từng bước chân.'
      },
      {
        q: 'Mất bao lâu thì một bé mới bắt đầu có thể tự trượt được?',
        a: 'Thông thường chỉ sau 3 đến 5 buổi học cơ bản, hơn 95% học viên nhí đã nắm được kỹ thuật giữ thăng bằng và tự tin lướt mượt mà.'
      }
    ]
  },

  'lan-su-rong': {
    badgeIcon: 'drum',
    badgeThemeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    themeGradient: 'from-red-700 to-amber-600 hover:from-red-800 hover:to-amber-700',
    asideBorderColor: 'border-red-600/30',
    instructorShortName: 'Thầy Hoàng',
    instructorAvatarBg: 'bg-amber-100 border-amber-300',
    instructorAvatarText: 'text-red-700',
    instructorRole: 'Trưởng Đoàn Lân Sư Rồng Nghệ Thuật',
    instructorBio: 'Võ sư - Nghệ nhân Lân Sư Rồng gạo cội, nặng lòng với việc gìn giữ tinh hoa võ cổ truyền và nghệ thuật biểu diễn dân gian. Thầy Hoàng luôn xem các học viên như con em trong nhà, rèn đức trước khi rèn nghệ.',
    heroCaption: 'Đoàn Lân Sư Rồng tập dợt khí thế trong khuôn viên Cung Văn Hóa Lao Động Cơ Sở Bình Trưng',
    storyIcon: 'bell',
    storyIconColor: 'text-amber-600',
    storyTitle: 'Tiếng Trống Lân Vang Vọng: Gìn Giữ Hồn Quê & Khí Phách Anh Hào',
    storyParagraphs: `
      <p>
        Tiếng trống lân "thùng... thình... cắc... tùng!" rền vang, tiếng chũm chọe xập xình cùng những điệu múa lân uy dũng uốn lượn luôn mang lại niềm hân hoan rực rỡ và may mắn cho mọi người. Tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, <strong>CLB Lân Sư Rồng</strong> do <strong>Huỳnh Kim Hoàng</strong> dẫn dắt là cái nôi gìn giữ di sản văn hóa hào hùng của dân tộc.
      </p>
      <p>
        Được mở lớp hoàn toàn <strong>MIỄN PHÍ HỌC PHÍ</strong>, CLB tạo ra một sân chơi thể thao và võ thuật truyền thống lành mạnh cho thanh thiếu niên địa phương, giúp các bạn trẻ tránh xa các tệ nạn xã hội và thói quen cắm mặt vào game online.
      </p>
      <p>
        Từng bước tấn vững chãi, kỹ thuật nâng đầu lân nặng hàng chục cân nhảy thoăn thoắt trên giàn mai hoa thung hay nhịp gõ trống dồn dập rèn luyện cho các em một thể lực phi thường cùng tình huynh đệ keo sơn, gắn bó trọn đời.
      </p>
    `,
    benefitBgGradient: 'from-amber-50 to-red-50',
    benefitBorderColor: 'border-amber-200',
    benefit1Title: 'Miễn Phí Học Phí 100% Cho Mọi Học Viên',
    benefit1Desc: 'Chính sách an sinh văn hóa nhân văn của Cung Văn Hóa Lao Động TP.HCM nhằm bảo tồn nghệ thuật dân gian.',
    benefit2Title: 'Rèn Luyện Thể Lực & Bộ Tấn Rắn Rỏi',
    benefit2Desc: 'Luyện tập đao thương, võ cổ truyền, nhảy mai hoa thung giúp cơ thể dẻo dai, phản xạ cực nhạy.',
    benefit3Title: 'Học Võ Đạo & Nghĩa Khí Huynh Đệ',
    benefit3Desc: 'Học viên được giáo dục sâu sắc về đạo làm người, tôn sư trọng đạo, sống có trách nhiệm với gia đình và xã hội.',
    faqs: [
      {
        q: 'Học phí có phát sinh chi phí phụ thu gì không?',
        a: 'Hoàn toàn KHÔNG! Học phí miễn phí 100%. Đoàn trang bị đầy đủ trống, chũm chọe, đầu lân và phục trang biểu diễn cho đoàn viên.'
      },
      {
        q: 'Học viên bao nhiêu tuổi thì có thể xin gia nhập?',
        a: 'CLB tiếp nhận thanh thiếu niên từ 12 tuổi trở lên có sức khỏe tốt, chăm chỉ và có niềm đam mê mãnh liệt với bộ môn nghệ thuật dân gian.'
      },
      {
        q: 'Thời gian tập luyện như thế nào?',
        a: 'Đội sinh hoạt đều đặn 10 buổi/tuần với 2 khung giờ rất linh hoạt: ca trưa 11:00 - 12:30 và ca chiều 16:00 - 17:30.'
      }
    ]
  },

  'bong-da': {
    badgeIcon: 'activity',
    badgeThemeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    themeGradient: 'from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800',
    asideBorderColor: 'border-emerald-500/30',
    instructorShortName: 'Ban Thể Thao',
    instructorAvatarBg: 'bg-emerald-100 border-emerald-300',
    instructorAvatarText: 'text-emerald-700',
    instructorRole: 'Ban Quản Lý & Điều Phối Thể Thao Phong Trào',
    instructorBio: 'Đội ngũ phụ trách chuyên môn thể thao phong trào của Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, chuyên tổ chức các giải đấu bóng đá mini, kết nối giao lưu giữa các công đoàn cơ sở, doanh nghiệp và thanh niên trên địa bàn.',
    heroCaption: 'Trận bóng đá giao hữu sôi động dưới ánh đèn sân thể thao 245 Nguyễn Duy Trinh',
    storyIcon: 'compass',
    storyIconColor: 'text-emerald-600',
    storyTitle: 'Niềm Đam Mê Sân Cỏ: Nơi Tình Huynh Đệ Gắn Kết Qua Từng Đường Bóng',
    storyParagraphs: `
      <p>
        Không có gì xóa tan khoảng cách giữa đồng nghiệp và thắt chặt tình đoàn kết nhanh chóng bằng một trận bóng đá sau giờ làm. Dưới ánh đèn rực sáng của khu liên hợp thể thao Cung Văn Hóa Lao Động Cơ Sở Bình Trưng, những pha ban bật nhịp nhàng và những cú sút xé lưới mang lại tiếng reo hò sảng khoái bất tận.
      </p>
      <p>
        Được quản lý trực tiếp bởi <strong>Ban Thể Thao Cơ Sở Bình Trưng</strong>, cụm sân bóng đá mini được đầu tư mặt sân phẳng phiu, hệ thống chiếu sáng hiện đại và lưới chắn bóng an toàn, tạo điều kiện thi đấu tốt nhất cho mọi đội bóng.
      </p>
      <p>
        Cơ sở áp dụng chính sách <strong>ưu đãi đặc biệt cho đoàn viên công đoàn</strong> và các cơ quan, xí nghiệp đăng ký thuê sân định kỳ theo tháng để tổ chức phong trào rèn luyện sức khỏe bền vững.
      </p>
    `,
    benefitBgGradient: 'from-emerald-50 to-green-50',
    benefitBorderColor: 'border-emerald-100',
    benefit1Title: 'Mặt Sân Cỏ Đạt Chuẩn Giảm Chấn Thương',
    benefit1Desc: 'Mặt sân có độ nảy chuẩn, thoát nước nhanh, bề mặt êm ái giúp hạn chế tối đa nguy cơ lật sơ mi hay chấn thương khớp gối.',
    benefit2Title: 'Chính Sách Ưu Đãi Công Đoàn Doanh Nghiệp',
    benefit2Desc: 'Giá thuê sân ưu đãi cạnh tranh nhất khu vực Bình Trưng khi ký hợp đồng sinh hoạt cố định theo tháng.',
    benefit3Title: 'Giao Lưu Mở Rộng Quan Hệ Lành Mạnh',
    benefit3Desc: 'Cơ hội kết nối thi đấu giao hữu với các đơn vị, câu lạc bộ bóng đá phong trào mạnh trên địa bàn TP.HCM.',
    faqs: [
      {
        q: 'Đặt sân cố định theo tháng cho công ty có hợp đồng và hóa đơn không?',
        a: 'Có đầy đủ hợp đồng thuê sân và hỗ trợ thủ tục thanh toán cho công đoàn cơ sở, cơ quan, doanh nghiệp theo quy định.'
      },
      {
        q: 'Khu vực sân có chỗ đậu ô tô và phòng thay đồ không?',
        a: 'Khuôn viên 245 Nguyễn Duy Trinh có bãi xe rộng rãi giữ được cả ô tô và xe máy, có phòng vệ sinh và phòng thay đồ sạch sẽ.'
      },
      {
        q: 'Liên hệ đặt sân bóng đá nhanh nhất bằng cách nào?',
        a: 'Quý cơ quan, đội bóng liên hệ trực tiếp Hotline/Zalo Ban Thể Thao: 0904 450 057 để kiểm tra khung giờ trống và chốt lịch thi đấu.'
      }
    ]
  }
};

// Cross links helper
function getCrossLinksHtml(currentId) {
  const allCourses = rawCourses.courses;
  const others = allCourses.filter(c => c.id !== currentId).slice(0, 3);
  return others.map(c => `
    <li>
      <a href="../${c.id}/" class="group flex items-center justify-between text-slate-700 hover:text-blue-600 font-medium">
        <span>${c.name}</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition"></i>
      </a>
    </li>
  `).join('\n');
}

// Gallery items helper
function getGalleryItemsHtml(course, meta) {
  let images = [];
  const folderPath = path.join(ROOT_DIR, course.imageFolder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i) && f !== '1.jpg');
    images = files.slice(0, 4).map(f => `../../${course.imageFolder}/${f}`);
  }
  
  // Fallback to Hinh-co-so-moi if needed
  if (images.length < 4) {
    const fallbackDir = path.join(ROOT_DIR, 'Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi');
    if (fs.existsSync(fallbackDir)) {
      const fbFiles = fs.readdirSync(fallbackDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
      for (const fb of fbFiles) {
        const fullRel = `../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/${fb}`;
        if (!images.includes(fullRel)) {
          images.push(fullRel);
        }
        if (images.length >= 4) break;
      }
    }
  }

  return images.map((img, idx) => `
    <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square">
      <img src="${img}" alt="${course.name} hình ảnh ${idx + 1}" class="w-full h-full object-cover hover:scale-110 transition duration-300">
    </div>
  `).join('\n');
}

// Generate FAQ HTML
function getFaqHtml(faqs) {
  return faqs.map((f, i) => `
    <details class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"${i === 0 ? ' open' : ''}>
      <summary class="font-extrabold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between">
        <span>${f.q}</span>
        <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-open:rotate-180 transition"></i>
      </summary>
      <p class="text-xs sm:text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
        ${f.a}
      </p>
    </details>
  `).join('\n');
}

// Generate Schema JSON-LD
function getSchemaJsonLd(course, meta, canonicalUrl) {
  const schemaObj = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": course.name,
        "description": `${course.name} tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng (245 Nguyễn Duy Trinh). Huấn luyện viên: ${course.instructor}. Lịch học: ${course.schedule}. Học phí: ${course.feeFormatted}.`,
        "provider": {
          "@type": "SportsActivityLocation",
          "name": "Cung Văn Hóa Lao Động TP. Hồ Chí Minh — Cơ Sở Bình Trưng",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Số 245 Nguyễn Duy Trinh, Phường Bình Trưng",
            "addressLocality": "Phường Bình Trưng",
            "addressRegion": "TP. Hồ Chí Minh",
            "addressCountry": "VN"
          },
          "telephone": "0904450057"
        },
        "instructor": {
          "@type": "Person",
          "name": course.instructor,
          "jobTitle": meta.instructorRole,
          "telephone": course.phone.replace(/\D/g, '')
        },
        "offers": {
          "@type": "Offer",
          "price": course.fee ? String(course.fee) : "0",
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "category": course.feeFormatted
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": "https://cungvanhoalaodong.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Lớp học Quý 4",
            "item": "https://cungvanhoalaodong.com/#lop-hoc"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": course.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": meta.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n  </script>`;
}

// Generate single course article
function generateCourseArticle(courseId) {
  const course = rawCourses.courses.find(c => c.id === courseId);
  const meta = courseMetadata[courseId];
  if (!course || !meta) {
    console.error(`Course or metadata not found for: ${courseId}`);
    return;
  }

  const slug = course.id;
  const canonicalUrl = `https://cungvanhoalaodong.com/lop-hoc/${slug}/`;
  const cleanPhone = course.phone.replace(/\D/g, '');
  const displayPhone = cleanPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const zaloMsg = encodeURIComponent(`Xin chao ${meta.instructorShortName}, toi muon tu van lop ${course.name} tai Co So Binh Trung`);

  // Hero image path logic
  let heroImage = `../../${course.imageFolder}/1.jpg`;
  const localHeroCheck = path.join(ROOT_DIR, course.imageFolder, '1.jpg');
  if (!fs.existsSync(localHeroCheck)) {
    heroImage = `../../Cung-Van-Hoa-Lao-Dong-Co-So-Binh-Trung/Hinh-co-so-moi/1.jpg`;
  }

  const pageTitle = `${course.name} Bình Trưng | 245 Nguyễn Duy Trinh TP.HCM`;
  const metaDesc = `Tham gia ${course.name} tại Cung Văn Hóa Lao Động Cơ Sở Bình Trưng (245 Nguyễn Duy Trinh, TP.HCM). Giảng viên: ${course.instructor}. Lịch học: ${course.schedule}. Đăng ký trực tiếp Zalo: ${displayPhone}.`;
  const metaKeywords = `${course.name.toLowerCase()}, lớp học bình trưng, cung văn hóa lao động quận 2, 245 nguyễn duy trinh, ${course.category.toLowerCase()}`;

  const ogTitle = `${course.name} — Cơ Sở Bình Trưng`;
  const ogDesc = `Khóa học ${course.name} chất lượng cao tại Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng (245 Nguyễn Duy Trinh).`;
  const ogImage = `https://cungvanhoalaodong.com/${heroImage.replace(/^\.\.\/\.\.\//, '')}`;

  const schemaJsonLd = getSchemaJsonLd(course, meta, canonicalUrl);
  const galleryItems = getGalleryItemsHtml(course, meta);
  const faqAccordions = getFaqHtml(meta.faqs);
  const crossLinks = getCrossLinksHtml(course.id);

  let html = templateHtml;

  // Replacements
  const replacements = {
    '{{PAGE_TITLE}}': pageTitle,
    '{{META_DESCRIPTION}}': metaDesc,
    '{{META_KEYWORDS}}': metaKeywords,
    '{{CANONICAL_URL}}': canonicalUrl,
    '{{OG_TITLE}}': ogTitle,
    '{{OG_DESCRIPTION}}': ogDesc,
    '{{OG_IMAGE}}': ogImage,
    '{{SCHEMA_JSON_LD}}': schemaJsonLd,
    '{{INSTRUCTOR_PHONE_CLEAN}}': cleanPhone,
    '{{INSTRUCTOR_PHONE_DISPLAY}}': displayPhone,
    '{{ZALO_MSG_ENCODED}}': zaloMsg,
    '{{THEME_GRADIENT}}': meta.themeGradient,
    '{{INSTRUCTOR_SHORT_NAME}}': meta.instructorShortName,
    '{{COURSE_NAME}}': course.name,
    '{{BADGE_THEME_CLASS}}': meta.badgeThemeClass,
    '{{BADGE_ICON}}': meta.badgeIcon,
    '{{CATEGORY_NAME}}': course.category,
    '{{ARTICLE_HEADING}}': `${course.name}: Rèn Luyện Thể Chất & Tinh Thần Tại 245 Nguyễn Duy Trinh`,
    '{{ARTICLE_SUBTITLE}}': `Đồng hành cùng ${course.instructor} trong không gian sinh hoạt văn hóa thể thao hiện đại, khang trang của Cung Văn Hóa Lao Động Cơ Sở Bình Trưng.`,
    '{{HERO_IMAGE_PATH}}': heroImage,
    '{{HERO_CAPTION}}': meta.heroCaption,
    '{{STORY_ICON}}': meta.storyIcon,
    '{{STORY_ICON_COLOR}}': meta.storyIconColor,
    '{{STORY_TITLE}}': meta.storyTitle,
    '{{STORY_PARAGRAPHS}}': meta.storyParagraphs,
    '{{BENEFIT_BG_GRADIENT}}': meta.benefitBgGradient,
    '{{BENEFIT_BORDER_COLOR}}': meta.benefitBorderColor,
    '{{BENEFIT_1_TITLE}}': meta.benefit1Title,
    '{{BENEFIT_1_DESC}}': meta.benefit1Desc,
    '{{BENEFIT_2_TITLE}}': meta.benefit2Title,
    '{{BENEFIT_2_DESC}}': meta.benefit2Desc,
    '{{BENEFIT_3_TITLE}}': meta.benefit3Title,
    '{{BENEFIT_3_DESC}}': meta.benefit3Desc,
    '{{GALLERY_ITEMS}}': galleryItems,
    '{{INSTRUCTOR_AVATAR_BG}}': meta.instructorAvatarBg,
    '{{INSTRUCTOR_AVATAR_TEXT}}': meta.instructorAvatarText,
    '{{INSTRUCTOR_ROLE}}': meta.instructorRole,
    '{{INSTRUCTOR_NAME}}': course.instructor,
    '{{INSTRUCTOR_BIO}}': meta.instructorBio,
    '{{FAQ_ACCORDIONS}}': faqAccordions,
    '{{ASIDE_BORDER_COLOR}}': meta.asideBorderColor,
    '{{FEE_PRIMARY}}': course.feeFormatted,
    '{{FEE_NOTE}}': course.fee === 0 
      ? 'Chính sách an sinh: Miễn 100% học phí'
      : (course.fee === null 
          ? (course.id === 'dance-kids-ballet-kids' 
              ? 'Nhiều gói học phí linh hoạt theo số buổi' 
              : (course.id === 'cau-long' 
                  ? 'Ưu đãi đặt sân cố định cho hội nhóm' 
                  : 'Ưu đãi giao lưu phong trào cơ quan'))
          : 'Mức học phí an sinh công đoàn'),
    '{{SCHEDULE_TEXT}}': course.schedule,
    '{{SCHEDULE_SUB}}': `${course.frequency} • ${course.duration}`,
    '{{LOCATION_TEXT}}': course.location,
    '{{TARGET_TEXT}}': course.target,
    '{{CROSS_LINK_ITEMS}}': crossLinks
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  // Create target directory & write index.html
  const targetDir = path.join(ROOT_DIR, 'lop-hoc', slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`[OK] Generated: lop-hoc/${slug}/index.html`);
}

// Generate all remaining 11 courses
const targetCourses = Object.keys(courseMetadata);
console.log(`Generating ${targetCourses.length} course articles...`);
targetCourses.forEach(generateCourseArticle);

// Update sitemap.xml
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
const all15CourseSlugs = rawCourses.courses.map(c => c.id);

let newSitemapEntries = [];
all15CourseSlugs.forEach(slug => {
  const urlEntry = `https://cungvanhoalaodong.com/lop-hoc/${slug}/`;
  if (!sitemap.includes(urlEntry)) {
    newSitemapEntries.push(`  <url>
    <loc>${urlEntry}</loc>
    <lastmod>2026-09-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }
});

if (newSitemapEntries.length > 0) {
  sitemap = sitemap.replace('</urlset>', `${newSitemapEntries.join('\n')}\n</urlset>`);
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
  console.log(`[OK] Updated sitemap.xml with ${newSitemapEntries.length} new URLs!`);
}

// Update app.js courseArticleMap
let appJs = fs.readFileSync(APP_JS_PATH, 'utf-8');
const mapEntries = all15CourseSlugs.map(slug => `    '${slug}': 'lop-hoc/${slug}/'`).join(',\n');
const replacementMap = `const courseArticleMap = {\n${mapEntries}\n  };`;

appJs = appJs.replace(/const courseArticleMap = \{[\s\S]*?\};/, replacementMap);
fs.writeFileSync(APP_JS_PATH, appJs, 'utf-8');
console.log(`[OK] Updated js/app.js courseArticleMap with all 15 courses!`);
