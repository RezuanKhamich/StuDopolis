import frontend_icon from "../media/courseWallpaper/frontend.png";
import minecraft_icon from "../media/courseWallpaper/minecraft.png";
import python_icon from "../media/courseWallpaper/python.png";
import figma_icon from "../media/courseWallpaper/figma.png";
import unity_icon from "../media/courseWallpaper/unity.png";
import adobe_illustrator_icon from "../media/courseWallpaper/adobe_illustrator.png";
import blender_icon from "../media/courseWallpaper/blender.png";
import unreal_engine_icon from "../media/courseWallpaper/unreal_engine.png";
import ksp_icon from "../media/courseWallpaper/kerbal_space_programm.png";
import logo from "../component/Header/Navbar/media/logo.png";
import learn_newImg from "../component/Header/Navbar/media/learn_new.png";
import freelanceImg from "../component/Header/Navbar/media/freelance_new.png";
import ratingImg from "../component/Header/Navbar/media/rating_new.png";
import companyImg from "../component/Header/Navbar/media/company_new.png";
import html_bg from "../media/html_background.png";
import messageImg from "../component/Header/Navbar/media/message_new.png";
import css_bg from "../media/css_background.png";
import js_bg from "../media/js_background.png";
import react_bg from "../media/react_background.png";
import redux_bg from "../media/redux_background.png";
import newsImg from "../component/Header/Navbar/media/news_new.png";
import admin from "../component/Header/Navbar/media/admin_logo_important.png";
import shop from "../component/Header/Navbar/media/bitcoin.png";

export const careersRang = [
  {vacancy: 'Стажер', requiredExp: '-', rewardGoldCoin: '-', rewardGreenCoin: '2000' },
  {vacancy: 'Младший разработчик (Junior)', requiredExp: '55000', rewardGoldCoin: '250', rewardGreenCoin: '5000' },
  {vacancy: 'Разработчик (Middle)', requiredExp: '100000', rewardGoldCoin: '400', rewardGreenCoin: '20000' },
  {vacancy: 'Опытный разработчик (Senior)', requiredExp: '170000', rewardGoldCoin: '650', rewardGreenCoin: '35000' },
  {vacancy: 'Ведущий разработчик (TeamLead)', requiredExp: '260000', rewardGoldCoin: '950', rewardGreenCoin: '45000' },
]

export const coursesData = [
  { name: 'Разработка игр на Unity',
    iconURL: unity_icon,
    description: `Обучение созданию собсвтенных игр на движке Unity`,
    passingTime: '4,5',
    disabled: true,
  },
  { name: 'Разработка сайтов',
    iconURL: frontend_icon,
    description: `Разработка современных веб-сайтов на Javascript, React`,
    passingTime: '4,5',
    disabled: false,
  },
  { name: 'Программирование на Minecraft',
    iconURL: minecraft_icon,
    description: `Обучение программированию на базе Minecraft Education`,
    passingTime: '3',
    disabled: true,
  },
  { name: 'Программирование на Python',
    iconURL: python_icon,
    description: `Обучение программированию на языке Python`,
    passingTime: '3',
    disabled: true,
  },
  { name: 'Веб-дизайн',
    iconURL: figma_icon,
    description: `Обучение созданию красочных дизайнов сайтов`,
    passingTime: '3,5',
    disabled: true,
  },
  { name: 'Цифровой рисунок (Digital Art)',
    iconURL: adobe_illustrator_icon,
    description: `Обучение работы с adobe illustrator и анимации`,
    passingTime: '4',
    disabled: true,
  },
  { name: '3D моделирование',
    iconURL: blender_icon,
    description: `Создание собственных трехмерных объектов в Blender`,
    passingTime: '3',
    disabled: true,
  },
  { name: 'Разработка игр на Unreal Engine',
    iconURL: unreal_engine_icon,
    description: `Разработка игр на языке С++`,
    passingTime: '3,5',
    disabled: true,
  },
  { name: 'Космо-проектирование KSP',
    iconURL: ksp_icon,
    description: `Обучение конструированию ракет, запусков на дальние орбиты и построение траектории`,
    passingTime: '2',
    disabled: true,
  },
]

export const pageNavigationData = [
  {img: logo, msg: false, logo: true, link: ''},
  {name: 'Обучение', img: learn_newImg, msg: 'learn', link: 'courses'},
  {name: 'Фриланс', img: freelanceImg, msg: 'freelance', link: 'freelance'},
  {name: 'Рейтинг', img: ratingImg, msg: false, link: 'rating'},
  // {name: 'Модель', img: ratingImg, msg: false, link: 'model'},
  // {name: 'Карьера', img: companyImg, msg: false, link: 'career'},
  {name: 'G-Pay', img: shop, msg: false, link: 'shop'},
  // {name: 'Кабинет', img: homeImg, msg: false, link: 'profile'},
  {name: 'Новости', img: newsImg, msg: false, link: 'news'},
  // {name: 'Почта', img: messageImg, msg: false, link: 'messages'},
  // {name: 'Помощь', img: helpImg, msg: false},
  // {name: 'Выйти', img: exitImg, msg: false},
]

export const modulesData = [
  {name: 'Изучаем HTML5', disabled: false, image: html_bg},
  {name: 'Основы CSS/CSS3', disabled: false, image: css_bg},
  {name: 'JavaScript ES6+', disabled: true, image: js_bg},
  {name: 'JavaScript работа с DOM', disabled: true, image: js_bg},
  {name: 'Основы React.js', disabled: true, image: react_bg},
]