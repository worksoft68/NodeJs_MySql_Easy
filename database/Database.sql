-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: futureoffice
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categorie_id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `summary` varchar(1000) NOT NULL,
  `content_articles` text NOT NULL,
  `ordering` int(11) DEFAULT NULL,
  `is_special` tinyint(4) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `user_id_approved` int(11) DEFAULT NULL,
  `username_approved` varchar(40) DEFAULT NULL,
  `datetime_approved` date DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  `count_view` int(11) NOT NULL,
  `count_like` int(11) NOT NULL,
  `count_dislike` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categories` (`categorie_id`),
  CONSTRAINT `fk_categories` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,1,1,'Những điểm du lịch mùa Thu','nhung-diem-du-lich-mua-thu','du-lich-mua-thu-220812-o4ADHzrPpm.jpg','Tháng 9 là tháng giữa mùa Thu, lúc này thời tiết mát mẻ, dễ chịu. Nếu đi du lịch trong nước bạn có thể lựa chọn du lịch vùng sông nước Miền Tây vì đây là mùa nước nổi nên khung cảnh rất thơ mộng. ','<p>Tháng 9 là thời điểm các thửa ruộng bậc thang bắt đầu chín rộ, đến đó chúng ta sẽ có cơ hội chiêm ngưỡng vẻ đẹp nên thơ của mùa vàng Tây Bắc. </p><p><strong>An Giang</strong> là một trong những địa điểm  nổi tiếng ở vùng sông nước. Nơi đây không chỉ thu hút du khách vẻ đẹp văn hóa nước nổi mà còn ở lối kiến trúc độc đáo, cổ kính từ những ngôi chùa. Ngoài ra nơi đây cũng có nhiều địa điểm núi, hồ thoáng đãng và hùng vĩ rất thích hợp cho những du khách thích trải nghiệm và khám phá.</p><p>Đến An Giang chắc chắn phải ghé những danh lam thắng cảnh nổi tiếng như: Rừng tràm Trà Sư, Hồ Ông Thoại - Núi Sập, Hồ Tà Pạ, Búng Bình Thiên, Núi Cô Tô, Khu Thất Sơn, Hồ Latina, Cù lao Ông Chưởng… Hoặc cũng có thể tham quan những địa điểm du lịch tâm linh như: Chùa Lầu, Thánh đường Hồi giáo Jamiul Azhar, Miếu bà chúa Xứ, Chùa Giồng Thành, Cánh cổng chùa Koh Kas, Chùa Vạn Linh, Tây An Cổ Tự… và những địa điểm du lịch văn hóa truyền thống: Khu Di Chỉ Óc Eo, Chợ nổi Long Xuyên, Làng văn hóa người Chăm, Làng dệt Thổ Cẩm, Làng nổi cá bè Châu Đốc, Trại cá sấu Long Xuyên…</p><p><strong>Cà Mau</strong> cũng là địa điểm du lịch hấp dẫn du khách trong tháng 9 này. Nơi đây là điểm cuối cùng trên bản đồ Việt Nam. Có lẽ vì thế mà du khách đều muốn ghé đến trong hành trình du lịch của mình.</p><p>Cà Mau cũng có chợ nổi, nơi người dân bán buôn tấp nập với đủ loại hàng hóa trên các ghe xuồng độc đáo. Tuy không nổi và đông đúc như chợ Cái Răng (Cần Thơ) nhưng chợ nổi Cà Mau vẫn có nét đẹp riêng của vùng sông nước.</p><p>Một số địa điểm Cà Mau bạn có thể tham quan như: Đất Mũi, Sân Chim Ngọc Hiển, Đảo Hòn Khoai, vườn quốc gia U Minh Hạ, Biển Khai Long, Hòn Đá Bạc…</p><p><strong>Đến Yên Bái</strong> thì nên ghé Mù Cang Chải để có cơ hội “săn mùa vàng” trong tháng 9 này. Bạn chắc chắn sẽ ngỡ ngàng trước vẻ đẹp thiên nhiên bao la, bát ngát nhưng rất đỗi nên thơ và hữu tình. Đó là vẻ đẹp của những thửa ruộng bậc thang, là những ngọn đồi cao chới với và đặc biệt là khung cảnh rộn ràng của những lễ hội của người dân nơi đây.</p><p>Những địa điểm tại Yên Bái mà bạn nên khám phá: Suối Giàng, Mù Cang Chải, Hồ Thác Bà, Thác Pú Nhu, Làng văn hóa Ngòi Tu, Chợ đá quý Lục Yên, Săn mây Tà Xùa…</p><p><strong>Mộc Châu</strong> nên được liệt kê trong danh sách những điểm đến của tháng 9 vì nơi đây có vẻ đẹp của mùa lúa chín vàng rực. Thêm vào đó điểm xuyết những ngôi nhà vùng núi nhỏ xinh cùng mây trời xanh biếc có vài gợn mây lãng mạn và nên thơ.</p><p>Đến Mộc Châu còn được cảm nhận vẻ đẹp của lối sống văn hóa địa phương từ những người miền núi chân chất và mộc mạc. Nó như một bức tranh sống động vừa có hình ảnh, vừa có tiếng cười và có luôn cả mùi hương lúa chín thơm thoang thoảng trong gió.</p><p>Địa điểm Mộc Châu không nên bỏ qua khi ghé: Bản Lóong Luông, Bản Tân Lập, Bản Pá Phách, Đồi chè Mộc Sương, Ngũ động Bản Ôn, Thác Dải Yếm…</p><p>Tháng 10, thời tiết bắt đầu chuyển lạnh, là khoảng thời gian cuối của mùa Thu, đây là thời điểm thích hợp để bạn đi du lịch Hà Giang ngắm những cánh đồng hoa tam giác mạch bạt ngàn hoặc ghé thăm biển Phú Quốc xinh đẹp.</p>',1,1,'Active',NULL,NULL,NULL,1,'Admin Supper','2022-07-16 15:15:21',1,'Admin Supper','2022-08-13 15:39:12',0,0,0),(4,1,1,'Xúc động lễ Vu lan báo hiếu 2022 tại chùa Pháp Hoa ở TP.HCM','xuc-dong-le-vu-lan-bao-hieu-2022-tai-chua-phap-hoa-o-tp-hcm','vu-lan-1-220812-6vZdOJ6dRy.jpg','Ngày 12/8 (tức Rằm tháng 7 Âm lịch), tại chùa Pháp Hoa (quận 3, TP.HCM) lễ Vu lan báo hiếu 2022 được tổ chức trang nghiêm và đầy xúc động. ','<p>Theo quan niệm của Phật giáo, rằm tháng 7 Âm lịch gắn với đại lễ Vu lan báo hiếu. Mọi người đi lễ chùa cầu mong cho đấng sinh thành, cho gia đạo sức khỏe, bình an.</p><p>Từ sáng sớm rất đông phật tử đã đến chùa Pháp Hoa để tham dự đại lễ Vu lan báo hiếu. Nhiều người chắp tay bái Phật, cầu mong bình an cho gia đình. Chùa Pháp Hoa chuẩn bị sẵn Kinh A Di Đà sám hối sám nguyện để Phật tử cùng tham gia làm lễ tại chùa.</p><p>Xa nhà 4 năm, Đỗ Thị Thu Trinh (24 tuổi, Gò Vấp) rơi nước mắt khi nghe các sư thầy đọc những câu chuyện, bài hát, bài thơ về tình mẫu tử. “Chúng ta nên trân trọng những gì đang có ở hiện tại, phải nhớ báo hiếu, hiếu thảo với khi cha mẹ khi còn có thể. Mình rất xúc động khi nghe những lời sư thầy nói, nhớ ba mẹ không kìm được lòng mà khóc. Hiện cha mẹ mình đều đang bị bệnh điều trị ở quê, mình chỉ muốn bỏ việc để chạy về nhà chăm lo cho cha mẹ”, Thu Trinh bộc bạch.</p><p>Bà Nguyễn Thị Mai Thi, (49 tuổi, TP Thủ Đức) chia sẻ: \"Mỗi mùa Vu lan về tôi cảm thấy bồi hồi, xúc động khi nhớ về người mẹ đã mất. Bây giờ hiểu được Phật pháp, tôi cũng làm những điều thiện lành để hồi hướng, báo hiếu, báo ân với cha mẹ\".</p>',1,1,'Active',NULL,NULL,NULL,1,'Admin Supper','2022-07-16 15:38:26',1,'Admin Supper','2022-08-13 15:39:08',0,0,0),(5,1,1,'Truy lùng món bún đầy kỳ công, đặc sản của người Tày ở Hà Giang','truy-lung-mon-bun-day-ky-cong-dac-san-cua-nguoi-tay-o-ha-giang','bun-vit-guigiovetroiii-12012592-220812-D0QwtSwQIj.jpg','Công đoạn chế biến những sợi bún đầy cầu kỳ cộng với những con vịt béo tốt được chăn nuôi tự nhiên đã tạo nên hương vị đặc biệt của bún vịt ở Hà Giang.','<p>Hà Giang không chỉ thu hút du khách bởi cảnh non núi hùng vĩ được thiên nhiên ưu ái ban tặng mà còn ghi dấu ấn bởi ẩm thực đa dạng của đồng bào vùng cao. Và món bún vịt làng là một trong số đó. </p><p>Bún vịt làng là đặc sản mang văn hóa của người Tày ở Hà Giang. Món ăn chỉ với hai nguyên liệu chính là bún và vịt nhưng khi dùng thử, du khách sẽ phải ngạc nhiên với hương vị không thể tìm đâu được ngoài vùng đất nơi địa đầu của Tổ quốc. </p><p>Điều đầu tiên làm nên sự khác biệt ở bún vịt của dân tộc Tày đó là những sợi bún được chính người dân làm thủ công với quá trình cầu kỳ. </p><p>Gạo được lựa chọn kỹ để giã thành bột khô, sau đem nhào với nước rồi nặn thành từng viên bột to, cho vào nước sôi luộc nửa sống nửa chín. Những viên bột tiếp tục được đem đi giã nhuyễn để phần bột sống và chín hòa lẫn vào nhau…</p>',5,1,'Active',NULL,NULL,NULL,1,'Admin Supper','2022-07-20 11:33:36',1,'Admin Supper','2022-08-13 15:39:03',0,0,0),(6,3,1,'Thảm đỏ Miss World Vietnam 2022: Lóa mắt với vương miện của dàn hoa hậu, á hậu','tham-do-miss-world-vietnam-2022-loa-mat-voi-vuong-mien-cua-dan-hoa-hau-a-hau','thi-hoa-hau-2-220812-7N5HSZh2UB.jpg','Thảm đỏ Miss World Vietnam 2022 đã đón chào rất nhiều người đẹp và các gương mặt nổi tiếng đến tham dự.Thảm đỏ Miss World Vietnam 2022 đã đón chào rất nhiều người đẹp và các gương mặt nổi tiếng đến tham dự.','<p>Ngày 12/8, đêm chung kết cuộc thi Miss World Vietnam 2022 diễn ra tại thành phố biển Quy Nhơn với sự mong chờ của hàng trăm nghìn khán giả. Cuộc thi cũng chào mừng rất nhiều những gương mặt nổi tiếng trong showbiz cũng như dàn Hoa Á hậu đình đám đến tham dự. </p><p>Á hậu Kiều Loan xuất hiện đầu tiên trong bộ váy đỏ rực, tạo hình ảnh quyến rũ và cá tính. Thiết kế cúp ngực và đuôi cá giúp tôn lên thân hình thon gọn của Kiều Loan. Để phù hợp với outfit, người đẹp đã chọn layout makeup với son môi đỏ.<br />\"Mẹ bỉm sữa\" Tường San vừa bước lên thảm đỏ đã gây thương nhớ với tạo hình lộng lẫy như nàng công chúa. Như mọi khi, cô vẫn ưa chuộng gam màu trắng và tông trang điểm ngọt ngào. Chiếc váy ngày hôm nay của Tường San có thiết kế cúp ngực tôn lên vòng 1 và khoảng xuyên thấu vô cùng sexy.</p><p>Á hậu Phương Anh đã rũ bỏ hình tượng ngoan hiền, cô chọn cho mình một chiếc đầm đỏ nổi bật cho thảm đỏ ngày hôm nay. Thiết kết xuyên thấu, xẻ tà sâu giúp Phương Anh có hình ảnh trưởng thành, gợi cảm hơn rất nhiều.</p>',2,0,'Active',NULL,NULL,NULL,1,'Admin Supper','2022-08-12 18:49:58',1,'Admin Supper','2022-08-13 15:38:35',0,0,0),(7,3,1,'Cận giờ G, \'gà chiến\' Mai Phương thay đổi đồ dạ hội: Kín cổng cao tường, tiết chế hơn so với dự kiến','can-gio-g--ga-chien-mai-phuong-thay-doi-do-da-hoi-kin-cong-cao-tuong-tiet-che-hon-so-voi-du-kien','mai-phuong-thuy-1-220812-1fc7FWdhZo.jpg','Váy dạ hội của Huỳnh Nguyễn Mai Phương bất ngờ thay đổi ở phút 89.Váy dạ hội của Huỳnh Nguyễn Mai Phương bất ngờ thay đổi ở phút 89. Cận kề giờ chung kết Miss World Vietnam 2022 diễn ra, các thí sinh đã dần công bố những thiết kế váy dạ hội lộng lẫy, tinh xảo để tỏa sáng. ','<p>Tối nay Top 37 cô gái sẽ chính thức bước vào đêm thi quan trọng nên mặt hình ảnh luôn được đầu tư hết mức. Thí sinh Huỳnh Nguyễn Mai Phương là cái tên được đánh giá rất cao cho chiếc vương miện danh giá. </p><p>Theo như chia sẻ, Mai Phương sẽ mặc bộ váy dạ hội màu vàng xuyên thấu có phần tà dài, những khoảng hở tinh tế sẽ giúp cô trở nên quyến rũ hơn trên sân khấu tại thành phố biển Quy Nhơn.</p><p>Tuy nhiên, tới phút cuối, váy của Mai Phương đã có chút điều chỉnh để trở nên kín cổng cao tường hơn. Chia sẻ về lý do này, NTK Thượng Gia Kỳ cho biết: <em>\"Do yếu tố khách quan chiếc váy dạ hội chuẩn bị cho Huỳnh Nguyễn Mai Phương sẽ có thay đổi về form và họa tiết trên thân váy, rất cảm ơn mọi người đã ủng hộ và theo dõi em ấy trong thời gian qua. Cũng có chút tiếc nuối và xíu buồn nhưng mong rằng mọi thứ với em sẽ thật phù hợp và mong em sẽ thật tự tin để tỏa sáng\".</em></p><p> </p>',2,1,'Active',NULL,NULL,NULL,1,'Admin Supper','2022-08-12 18:55:10',1,'Admin Supper','2022-08-13 15:38:48',0,0,0);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `companies_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `slug` varchar(40) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `viewtype` varchar(20) NOT NULL,
  `link` text NOT NULL,
  `zone` varchar(10) DEFAULT NULL,
  `is_show_homepage` tinyint(4) NOT NULL,
  `ordering` int(11) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,0,1,'Categories 1','categories-1','Sport','view-list','','Top',1,1,'Categories 1','Active',NULL,NULL,NULL,1,'Supper Admin','2023-10-25 14:06:21'),(3,2,1,'Categories 2','categories-2','','view-list','','Top',1,2,'Categories 2','Active',1,'Admin Supper','2022-07-15 16:47:54',1,'Admin Supper','2022-08-13 15:16:27'),(12,0,1,'Categories 3','categories-3','','view-list','','Top',1,3,'Categories 3','Active',1,'Admin Supper','2022-07-16 10:35:21',1,'Admin Supper','2022-08-13 15:14:49'),(13,0,1,'Categories 4','categories-4','','view-list','','Top',1,4,'Categories 4','Active',1,'Admin Supper','2022-07-16 13:45:31',1,'Admin Supper','2022-08-12 18:11:29');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myguests`
--

DROP TABLE IF EXISTS `myguests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `myguests` (
  `Id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myguests`
--

LOCK TABLES `myguests` WRITE;
/*!40000 ALTER TABLE `myguests` DISABLE KEYS */;
/*!40000 ALTER TABLE `myguests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_companies`
--

DROP TABLE IF EXISTS `sys_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `provincial` bigint(20) DEFAULT NULL,
  `district` bigint(20) DEFAULT NULL,
  `email1` varchar(50) DEFAULT NULL,
  `email2` varchar(50) DEFAULT NULL,
  `phone_number1` varchar(20) DEFAULT NULL,
  `phone_number2` varchar(20) DEFAULT NULL,
  `number_worker` int(11) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `renewal_date` datetime DEFAULT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `representative_name` varchar(50) DEFAULT NULL,
  `link_facebook` varchar(300) DEFAULT NULL,
  `registration_amount` int(11) DEFAULT NULL,
  `registered_storage` int(11) DEFAULT NULL,
  `registered_sms` int(11) DEFAULT NULL,
  `registration_amount_sms` int(11) DEFAULT NULL,
  `bank_account_number1` varchar(15) DEFAULT NULL,
  `bank_name1` varchar(50) DEFAULT NULL,
  `bank_account_number2` varchar(15) DEFAULT NULL,
  `bank_name2` varchar(50) DEFAULT NULL,
  `status` varchar(8) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_companies`
--

LOCK TABLES `sys_companies` WRITE;
/*!40000 ALTER TABLE `sys_companies` DISABLE KEYS */;
INSERT INTO `sys_companies` VALUES (1,'Company One','VietNam',NULL,NULL,'',NULL,'',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','',NULL,NULL,'Active',1,'Admin Supper','2022-06-24 10:40:24',1,'Admin Supper','2022-06-24 11:48:00'),(2,'Company Two','USA',NULL,NULL,'',NULL,'',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','',NULL,NULL,'Active',1,'Admin Supper','2022-06-24 10:40:38',1,'Admin Supper','2022-06-24 11:48:07');
/*!40000 ALTER TABLE `sys_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_customsettings`
--

DROP TABLE IF EXISTS `sys_customsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_customsettings` (
  `id` varchar(50) NOT NULL,
  `image_setting` varchar(255) DEFAULT NULL,
  `is_use_ckeditor` tinyint(4) NOT NULL,
  `value_setting` varchar(1500) NOT NULL,
  `default_value` varchar(1500) NOT NULL,
  `location` varchar(50) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `ordering` int(11) DEFAULT NULL,
  `is_system` tinyint(4) NOT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_customsettings`
--

LOCK TABLES `sys_customsettings` WRITE;
/*!40000 ALTER TABLE `sys_customsettings` DISABLE KEYS */;
INSERT INTO `sys_customsettings` VALUES ('Ads Footer','',0,'<img class=\"img-fluid\" src=\"uploads/sys_customsettings/banner-right-220809-1zSB93lMJB.jpg\" alt=\"\"> ','<img class=\"img-fluid\" src=\"frontend/img/banner-ad.jpg\" alt=\"\"> ','General','0000-00-00 00:00:00','0000-00-00 00:00:00','Ads Footer',1,13,1,1,'Admin Supper','2022-08-09 18:17:37',1,'Admin Supper','2022-08-10 16:38:46'),('Banner Left - Logo','',0,'<a href=\"/\"> <img class=\"img-fluid\" src=\"uploads/sys_customsettings/logo-210918-ahdckncdud-220810-4mw9he056u.png\" alt=\"\"> </a>','<a href=\"/\"> <img class=\"img-fluid\" src=\"img/logo.png\" alt=\"\"> </a>','Banner left','2022-08-01 00:00:00','3000-08-31 00:00:00','logo banner image on the left',1,4,1,1,'Admin Supper','2022-08-09 18:06:39',1,'Admin Supper','2022-08-21 11:41:16'),('Banner Right - Ads','',0,'<img class=\"img-fluid\" src=\"uploads/sys_customsettings/banner-right-220809-1zSB93lMJB.jpg\" alt=\"\">\r\n','<img class=\"img-fluid\" src=\"img/banner-ad.jpg\" alt=\"\">','Banner right','2022-08-01 00:00:00','3000-08-31 00:00:00','right advertising banner',1,6,1,1,'Admin Supper','2022-08-09 18:11:48',1,'Admin Supper','2022-08-21 11:39:51'),('Copyright Footer','',0,'Copyright ©<script>document.write(new Date().getFullYear());</script>2021 All rights reserved | This template is made with <i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i> by <a href=\"https://colorlib.com\" target=\"_blank\">Colorlib</a>',' Copyright ©<script>document.write(new Date().getFullYear());</script>2021 All rights reserved | This template is made with <i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i> by <a href=\"https://colorlib.com\" target=\"_blank\">Colorlib</a>','Footer','2022-08-01 00:00:00','3000-08-31 00:00:00','Footer on the left',1,11,1,1,'Admin Supper','2022-08-10 13:47:41',1,'Admin Supper','2022-08-21 11:37:02'),('Footer Right','',0,'<a href=\"https://www.facebook.com/support/\"><i class=\"fa fa-facebook\"></i></a>\r\n                <a href=\"https://google.com\"><i class=\"fa fa-twitter\"></i></a>\r\n                <a href=\"https://www.youtube.com/channel/support\"><i class=\"fa fa-dribbble\"></i></a>\r\n                <a href=\"https://tuoitre.vn/\"><i class=\"fa fa-behance\"></i></a>','<a href=\"https://www.facebook.com/support/\"><i class=\"fa fa-facebook\"></i></a>\r\n                <a href=\"https://google.com\"><i class=\"fa fa-twitter\"></i></a>\r\n                <a href=\"https://www.youtube.com/channel/support\"><i class=\"fa fa-dribbble\"></i></a>\r\n                <a href=\"https://tuoitre.vn/\"><i class=\"fa fa-behance\"></i></a>','General','0000-00-00 00:00:00','0000-00-00 00:00:00','Icon Footer Right',1,12,1,1,'Admin Supper','2022-08-10 14:04:13',1,'Admin Supper','2022-08-10 16:33:13'),('Header Right','',0,'<li><a href=\"tel:+84 999999999\"><span class=\"lnr lnr-phone-handset\"></span><span>+84 999999999</span></a></li> <li><a href=\"mailto:support@gmail.com\"><span class=\"lnr lnr-envelope\"></span><span>support@gmail.com</span></a></li> ','<li><a href=\"tel:+84 999999999\"><span class=\"lnr lnr-phone-handset\"></span><span>+84 999999999</span></a></li> <li><a href=\"mailto:support@gmail.com\"><span class=\"lnr lnr-envelope\"></span><span>support@gmail.com</span></a></li> ','General','0000-00-00 00:00:00','0000-00-00 00:00:00','Header Right',1,1,1,1,'Admin Supper','2022-08-09 17:45:26',1,'Admin Supper','2022-08-10 16:31:57'),('Icon Header Left','',1,'<li><a href=\"https://www.facebook.com/support/\"><i class=\"fa fa-facebook\"></i></a></li>\r\n\r\n<li><a href=\"https://google.com\"><i class=\"fa fa-twitter\"></i></a></li>\r\n\r\n <li><a href=\"https://www.youtube.com/channel/support\"><i class=\"fa fa-dribbble\"></i></a></li>\r\n\r\n<li><a href=\"https://tuoitre.vn/\"><i class=\"fa fa-behance\"></i></a></li> ','<li><a href=\"#\"><i class=\"fa fa-facebook\"></i></a></li>\r\n<li><a href=\"#\"><i class=\"fa fa-twitter\"></i></a></li>\r\n<li><a href=\"#\"><i class=\"fa fa-dribbble\"></i></a></li>\r\n<li><a href=\"#\"><i class=\"fa fa-behance\"></i></a></li>\r\n                        ','General','0000-00-00 00:00:00','0000-00-00 00:00:00','link icon header left',1,1,1,1,'Admin Supper','2022-08-10 14:03:05',1,'Admin Supper','2022-08-10 16:32:58'),('image - Banner right','banner-right-220809-1zSB93lMJB.jpg',0,'Upload image to get link to create Banner right','    Upload image to get link to create Banner right  ','Banner right','2022-08-01 00:00:00','3000-08-31 00:00:00','banner ad image right',1,5,0,1,'Admin Supper','2022-08-09 18:21:59',1,'Admin Supper','2022-08-21 11:24:19'),('image ads footer','banner-right-220809-IwEZEOIQzC.jpg',0,' Get the link of the ad image','Get the link of the ad image','Adertisement end-of-page','0000-00-00 00:00:00','0000-00-00 00:00:00','hình quảng cáo cuối trang',1,10,1,1,'Admin Supper','2022-08-09 18:09:57',1,'Admin Supper','2022-08-20 16:06:08'),('image_logo','logo-210918-ahdckncdud-220810-4mw9he056u.png',0,'Get the logo link to create a banner','Get the logo link to create a banner','General','0000-00-00 00:00:00','0000-00-00 00:00:00','logo image',1,3,1,1,'Admin Supper','2022-08-10 14:07:08',1,'Admin Supper','2022-08-20 16:02:37'),('Page_Ranges','',0,'5','5','General','2022-08-01 00:00:00','3000-08-31 00:00:00',' number of pages',1,1,1,1,'Admin Supper','2022-08-10 08:44:55',1,'Admin Supper','2022-08-21 11:32:28'),('Sildebar Right 2','',0,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Convenient\r\n<br/>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Very fast\r\n<br/>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Effective\r\n<br/>\r\n<button type=\"button\" class=\"btn btn-primary\" onclick=\"location.href=\'articles/download-product-15\'\">Download</button>\r\n\r\n','<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Convenient\r\n<br/>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Very fast\r\n<br/>\r\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-check2\" viewBox=\"0 0 16 16\">\r\n  <path d=\"M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\r\n</svg> Effective\r\n<br/>\r\n<button type=\"button\" class=\"btn btn-primary\" onclick=\"location.href=\'articles/download-product-15\'\">Download</button>\r\n\r\n','Sidebar right','0000-00-00 00:00:00','0000-00-00 00:00:00','',1,2,0,1,'Admin Supper','2022-08-09 17:52:37',1,'Admin Supper','2022-08-10 16:32:44'),('Title Latest News','',0,'Latest News','Latest News','General','2022-08-01 00:00:00','3000-08-31 00:00:00','Latest News',1,14,1,1,'Admin Supper','2022-08-10 13:50:17',NULL,NULL,NULL),('Title Sildebar Right 1','',0,'Random Post','Random Post','Sidebar right','2022-08-01 00:00:00','3000-08-31 00:00:00','Title Sildebar Right',1,7,1,1,'Admin Supper','2022-08-10 13:52:22',NULL,NULL,NULL),('Title Sildebar Right 2','logo-210918-ahdckncdud-220809-qypyS0vlqf.png',0,'Social Networks','Social Networks','Banner right','2022-08-01 00:00:00','2022-08-31 00:00:00','Title Sildebar Right 2',1,8,1,1,'Admin Supper','2022-08-09 18:20:12',NULL,NULL,NULL),('Total_Items_Per_Page','',0,'3','10','General','2022-08-01 00:00:00','3000-08-31 00:00:00','Total_Items_Per_Page',1,1,1,1,'Admin Supper','2022-08-10 14:05:40',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_customsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_departments`
--

DROP TABLE IF EXISTS `sys_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `abbreviation` varchar(15) DEFAULT NULL,
  `ordering` int(11) DEFAULT NULL,
  `status` varchar(5) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_companies` (`company_id`),
  CONSTRAINT `fk_sys_companies` FOREIGN KEY (`company_id`) REFERENCES `sys_companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_departments`
--

LOCK TABLES `sys_departments` WRITE;
/*!40000 ALTER TABLE `sys_departments` DISABLE KEYS */;
INSERT INTO `sys_departments` VALUES (1,1,'Board of manager','Board of manage',1,'1',1,'Admin Supper','2022-06-24 13:41:00',1,'Admin Supper','2022-06-25 08:42:29'),(2,1,'Business','Business',2,'true',1,'Admin Supper','2022-06-25 08:41:45',1,'Supper Admin','2023-06-02 09:38:18'),(3,1,'Human resouces','HR',3,'true',1,'Admin Supper','2022-06-25 08:42:00',1,'Supper Admin','2023-06-02 09:38:14'),(4,2,'Public User','Public User',4,'true',1,'Admin Supper','2022-06-25 08:42:14',1,'Supper Admin','2023-06-02 09:36:41');
/*!40000 ALTER TABLE `sys_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_districts`
--

DROP TABLE IF EXISTS `sys_districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_districts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provincial_id` int(11) DEFAULT NULL,
  `district_name` varchar(70) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_districts`
--

LOCK TABLES `sys_districts` WRITE;
/*!40000 ALTER TABLE `sys_districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_function_for_permissions`
--

DROP TABLE IF EXISTS `sys_function_for_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_function_for_permissions` (
  `function_name` varchar(50) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `modulesystem` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`function_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_function_for_permissions`
--

LOCK TABLES `sys_function_for_permissions` WRITE;
/*!40000 ALTER TABLE `sys_function_for_permissions` DISABLE KEYS */;
INSERT INTO `sys_function_for_permissions` VALUES ('articles','articles',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('categories','categories',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('hanghoa','hanghoa',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('loaihanghoa_mysql','loaihanghoa_mysql',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('loaihanghoa_test','loaihanghoa_test',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('systemlogs','systemlogs','systemlogs',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_companies','sys_companies',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_customSettings','sys_customsettings',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_departments','sys_departments',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_districts','sys_districts',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_permissions','sys_permissions',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_positions','sys_positions',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_provinces','sys_provinces',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_roles','sys_roles',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_role_permissions','sys_role_permissions',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_system_rights','sys_system_rights',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_users','sys_users',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),('sys_user_roles','sys_user_roles',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_function_for_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_permissions`
--

DROP TABLE IF EXISTS `sys_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `functions` varchar(50) NOT NULL,
  `fullauthority` tinyint(4) DEFAULT NULL,
  `addnew` tinyint(4) DEFAULT NULL,
  `updates` tinyint(4) DEFAULT NULL,
  `readonly` tinyint(4) DEFAULT NULL,
  `full_of_yourself` tinyint(4) DEFAULT NULL,
  `permission1` tinyint(4) DEFAULT NULL,
  `permission2` tinyint(4) DEFAULT NULL,
  `permission3` tinyint(4) DEFAULT NULL,
  `permission4` tinyint(4) DEFAULT NULL,
  `permission5` tinyint(4) DEFAULT NULL,
  `permission6` tinyint(4) DEFAULT NULL,
  `permission7` tinyint(4) DEFAULT NULL,
  `permission8` tinyint(4) DEFAULT NULL,
  `permission9` tinyint(4) DEFAULT NULL,
  `permission10` tinyint(4) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_function_for_permissions_sys_permissions` (`functions`),
  KEY `fk_sys_users_permissions` (`user_id`),
  CONSTRAINT `fk_sys_function_for_permissions_sys_permissions` FOREIGN KEY (`functions`) REFERENCES `sys_function_for_permissions` (`function_name`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_users_permissions` FOREIGN KEY (`user_id`) REFERENCES `sys_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_permissions`
--

LOCK TABLES `sys_permissions` WRITE;
/*!40000 ALTER TABLE `sys_permissions` DISABLE KEYS */;
INSERT INTO `sys_permissions` VALUES (2,1,'sys_companies',0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,NULL,'undefined undefined','2022-07-12 17:06:44',1,'Admin Supper','2022-07-12 17:43:16'),(3,1,'sys_customSettings',1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-12 17:36:25',NULL,NULL,NULL),(4,1,'sys_districts',0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-12 17:51:11',NULL,NULL,NULL),(5,1,'loaihanghoa_mysql',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-12 17:52:03',NULL,NULL,NULL),(10,2,'sys_companies',0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,'Admin Supper','2022-07-12 18:21:24',NULL,NULL,NULL),(11,2,'sys_customSettings',1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-12 18:21:24',NULL,NULL,NULL),(14,1,'systemlogs',1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2023-10-25 11:14:00',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_positions`
--

DROP TABLE IF EXISTS `sys_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `ordering` int(11) DEFAULT NULL,
  `is_manager` tinyint(1) DEFAULT NULL,
  `status` varchar(5) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_positions`
--

LOCK TABLES `sys_positions` WRITE;
/*!40000 ALTER TABLE `sys_positions` DISABLE KEYS */;
INSERT INTO `sys_positions` VALUES (1,'Direction',1,1,'1',1,'Admin Supper','2022-06-01 21:14:42',1,'Supper Admin','2023-06-01 13:45:20'),(2,'Deputy Director',2,1,'1',1,'Admin Supper','2022-06-15 16:03:16',1,'Admin Supper','2022-06-15 16:06:12'),(3,'Manager',3,1,'1',1,'Admin Supper','2022-06-15 16:06:25',NULL,NULL,NULL),(4,'Personnel',4,0,'1',1,'Admin Supper','2022-06-15 16:06:56',1,'Admin Supper','2022-06-24 08:53:26'),(5,'Public User',5,0,'1',1,'Admin Supper','2022-06-15 16:07:05',1,'Admin Supper','2022-06-24 08:53:31'),(6,'aaaaabbbb',2,0,'true',1,'Supper Admin','2023-06-01 14:42:01',1,'Supper Admin','2023-06-02 08:49:29');
/*!40000 ALTER TABLE `sys_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_provinces`
--

DROP TABLE IF EXISTS `sys_provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provincial_name` varchar(50) DEFAULT NULL,
  `area` varchar(70) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_provinces`
--

LOCK TABLES `sys_provinces` WRITE;
/*!40000 ALTER TABLE `sys_provinces` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_permissions`
--

DROP TABLE IF EXISTS `sys_role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `functions` varchar(50) NOT NULL,
  `fullauthority` tinyint(4) DEFAULT NULL,
  `addnew` tinyint(4) DEFAULT NULL,
  `updates` tinyint(4) DEFAULT NULL,
  `readonly` tinyint(4) DEFAULT NULL,
  `full_of_yourself` tinyint(4) DEFAULT NULL,
  `permission1` tinyint(4) DEFAULT NULL,
  `permission2` tinyint(4) DEFAULT NULL,
  `permission3` tinyint(4) DEFAULT NULL,
  `permission4` tinyint(4) DEFAULT NULL,
  `permission5` tinyint(4) DEFAULT NULL,
  `permission6` tinyint(4) DEFAULT NULL,
  `permission7` tinyint(4) DEFAULT NULL,
  `permission8` tinyint(4) DEFAULT NULL,
  `permission9` tinyint(4) DEFAULT NULL,
  `permission10` tinyint(4) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_roles` (`role_id`),
  KEY `fk_sys_function_for_permissions` (`functions`),
  CONSTRAINT `fk_sys_function_for_permissions` FOREIGN KEY (`functions`) REFERENCES `sys_function_for_permissions` (`function_name`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_roles` FOREIGN KEY (`role_id`) REFERENCES `sys_roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_permissions`
--

LOCK TABLES `sys_role_permissions` WRITE;
/*!40000 ALTER TABLE `sys_role_permissions` DISABLE KEYS */;
INSERT INTO `sys_role_permissions` VALUES (1,1,'sys_users',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,'sys_companies',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,1,'sys_customSettings',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,1,'sys_departments',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,1,'sys_districts',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,1,'sys_permissions',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,1,'sys_positions',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,1,'sys_provinces',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,1,'sys_roles',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,1,'sys_role_permissions',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,1,'sys_system_rights',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,1,'loaihanghoa_mysql',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,2,'sys_companies',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-10 15:42:08',1,'Admin Supper','2022-07-10 15:42:27'),(21,1,'categories',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-15 15:42:12',NULL,NULL,NULL),(22,1,'articles',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-07-15 15:42:22',NULL,NULL,NULL),(23,1,'loaihanghoa_test',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-08-02 15:35:51',NULL,NULL,NULL),(24,1,'hanghoa',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Admin Supper','2022-08-03 15:51:29',NULL,NULL,NULL),(26,1,'systemlogs',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Supper Admin','2023-10-25 11:28:15',NULL,NULL,NULL),(27,2,'systemlogs',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,'Supper Admin','2023-10-25 11:28:52',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_roles`
--

DROP TABLE IF EXISTS `sys_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `ordering` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_roles`
--

LOCK TABLES `sys_roles` WRITE;
/*!40000 ALTER TABLE `sys_roles` DISABLE KEYS */;
INSERT INTO `sys_roles` VALUES (1,'Manager',1,1,NULL,NULL,NULL,1,'Admin Supper','2022-07-08 16:26:23'),(2,'Admin',2,1,NULL,NULL,NULL,NULL,NULL,NULL),(3,'User',3,1,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_system_rights`
--

DROP TABLE IF EXISTS `sys_system_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_system_rights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `notes` varchar(50) DEFAULT NULL,
  `numericalorder` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_system_rights`
--

LOCK TABLES `sys_system_rights` WRITE;
/*!40000 ALTER TABLE `sys_system_rights` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_system_rights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_roles`
--

DROP TABLE IF EXISTS `sys_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_users` (`user_id`),
  KEY `fk_sys_roles1` (`role_id`),
  CONSTRAINT `fk_sys_roles1` FOREIGN KEY (`role_id`) REFERENCES `sys_roles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_users` FOREIGN KEY (`user_id`) REFERENCES `sys_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_roles`
--

LOCK TABLES `sys_user_roles` WRITE;
/*!40000 ALTER TABLE `sys_user_roles` DISABLE KEYS */;
INSERT INTO `sys_user_roles` VALUES (1,1,1,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,6,NULL,'undefined undefined','2022-07-10 17:05:25',NULL,NULL,NULL),(3,1,6,NULL,'undefined undefined','2022-07-10 17:05:28',NULL,NULL,NULL),(4,1,6,NULL,'undefined undefined','2022-07-10 17:06:18',NULL,NULL,NULL),(5,1,6,NULL,'undefined undefined','2022-07-10 17:10:43',NULL,NULL,NULL),(6,1,6,NULL,'undefined undefined','2022-07-10 17:11:48',NULL,NULL,NULL),(11,2,1,1,'Admin Supper','2022-07-11 15:55:48',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_users`
--

DROP TABLE IF EXISTS `sys_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(15) NOT NULL,
  `company_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `username_encrypted` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(25) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `district` bigint(20) DEFAULT NULL,
  `provincial` bigint(20) DEFAULT NULL,
  `nation` varchar(50) DEFAULT NULL,
  `is_management` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_time_login` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `receive_email` int(11) DEFAULT NULL,
  `receive_sms` int(11) DEFAULT NULL,
  `full_path_temporary_save` varchar(255) DEFAULT NULL,
  `temporary_file_name` varchar(255) DEFAULT NULL,
  `path_temporary_save` varchar(255) DEFAULT NULL,
  `manager_code` bigint(20) DEFAULT NULL,
  `link_change_password` varchar(200) DEFAULT NULL,
  `token_change_password` varchar(40) DEFAULT NULL,
  `notification_time_changed_password` datetime DEFAULT NULL,
  `time_changed_password` datetime DEFAULT NULL,
  `browser_headers` varchar(2000) DEFAULT NULL,
  `is_status_login` tinyint(4) DEFAULT NULL,
  `user_id_created` int(11) DEFAULT NULL,
  `user_name_created` varchar(35) DEFAULT NULL,
  `datetime_created` datetime DEFAULT NULL,
  `user_id_modified` int(11) DEFAULT NULL,
  `user_name_modified` varchar(35) DEFAULT NULL,
  `datetime_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sys_companies1` (`company_id`),
  KEY `fk_sys_departments` (`department_id`),
  KEY `fk_sys_positions` (`position_id`),
  CONSTRAINT `fk_sys_companies1` FOREIGN KEY (`company_id`) REFERENCES `sys_companies` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_departments` FOREIGN KEY (`department_id`) REFERENCES `sys_departments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sys_positions` FOREIGN KEY (`position_id`) REFERENCES `sys_positions` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_users`
--

LOCK TABLES `sys_users` WRITE;
/*!40000 ALTER TABLE `sys_users` DISABLE KEYS */;
INSERT INTO `sys_users` VALUES (1,'TT0001',1,2,1,'Admin','Supper','admin','0c7540eb7e65b553ec1ba6b20de79608','d93a5def7511da3d0f2d171d9c344e91','2023-11-20 00:00:00','Male','admin@gmail.com','123456','Viet Nam',NULL,NULL,NULL,NULL,'1',NULL,'huong-dung-230603-QNCFCjmYge.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','2022-07-14 18:01:05','2022-07-14 13:19:20',NULL,NULL,NULL,NULL,NULL,1,'undefined undefined','2023-06-12 19:35:05'),(2,'a11',1,1,1,'bbbb','aaâ','abc',NULL,'12345678',NULL,'Female','','1',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Admin Supper','2022-06-30 17:37:09',NULL,NULL,NULL),(3,'ttt3',2,3,5,'grdfhfhgf','fdgdhgfdh','1234567',NULL,'7c4a8d09ca3762af61e59520943dc26494f8941b',NULL,'Other','','111111111111',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Admin Supper','2022-06-30 17:41:14',NULL,NULL,NULL),(4,'TT0002',1,2,2,'Last Name','11111111111','hoa','0f20143e7b4c32dfbf3ce916ce49818e','3d08d4dc0609d0c95d95cef3592660c7',NULL,'Male','hoa@gmail.com','Phone Number',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Admin Supper','2022-07-02 16:47:15',NULL,NULL,NULL),(5,'TT0001c',1,1,2,'1111111111111111','1111111111','hoaxxxx','e98068e9f124f42bcc5fe1173b5e9cb6','0144712dd81be0c3d9724f5e56ce6685',NULL,'Female','hoaxxxxx@gmail.com','11111111111111',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Admin Supper','2022-07-02 17:11:17',1,'undefined undefined','2023-06-02 15:09:02'),(6,'TT0001a',1,1,1,'Supper','Admin123','adminabc','','',NULL,'Male','hthaihoa.it@gmail.com112','123456',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'Admin Supper','2022-07-03 11:22:01',1,'Admin Supper','2022-07-05 14:21:34');
/*!40000 ALTER TABLE `sys_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemlogs`
--

DROP TABLE IF EXISTS `systemlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemlogs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action_user` varchar(15) DEFAULT NULL,
  `impact_zone` varchar(60) DEFAULT NULL,
  `id_table` varchar(25) DEFAULT NULL,
  `content_log` varchar(2000) DEFAULT NULL,
  `contentlog_max` text DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `mac_address` varchar(20) DEFAULT NULL,
  `hostname` varchar(200) DEFAULT NULL,
  `id_user` bigint(20) DEFAULT NULL,
  `fullname` varchar(40) DEFAULT NULL,
  `datetime_log` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemlogs`
--

LOCK TABLES `systemlogs` WRITE;
/*!40000 ALTER TABLE `systemlogs` DISABLE KEYS */;
INSERT INTO `systemlogs` VALUES (4,'Update','categories','1','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"2\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:05:31.894\",\"id\":\"1\"}','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"2\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:05:31.894\",\"id\":\"1\"}','',NULL,NULL,1,NULL,'2023-10-25 14:05:31'),(5,'Update','categories','1','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"1\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:05:36.307\",\"id\":\"1\"}','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"1\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:05:36.307\",\"id\":\"1\"}','',NULL,NULL,1,NULL,'2023-10-25 14:05:36'),(6,'Update','categories','1','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"1\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:06:21.401\",\"id\":\"1\"}','{\"name\":\"Categories 1\",\"slug\":\"categories-1\",\"thumbnail\":\"Sport\",\"viewtype\":\"view-list\",\"link\":\"\",\"zone\":\"Top\",\"is_show_homepage\":1,\"ordering\":\"1\",\"description\":\"Categories 1\",\"status\":\"Active\",\"parent_id\":\"0\",\"user_id_modified\":1,\"user_name_modified\":\"Supper Admin\",\"datetime_modified\":\"2023-10-25 14:06:21.401\",\"id\":\"1\"}','',NULL,NULL,1,NULL,'2023-10-25 14:06:21');
/*!40000 ALTER TABLE `systemlogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 15:17:35
