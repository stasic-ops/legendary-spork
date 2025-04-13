// Анимация элементов при прокрутке
document.addEventListener('DOMContentLoaded', function () {
    // Добавляем класс fade-in ко всем элементам, которые нужно анимировать
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const items = section.querySelectorAll('h2, .timeline-item, .hero-card, .achievement-item, .gallery-item');
        items.forEach(item => {
            item.classList.add('fade-in');
        });
    });

    // Функция для проверки, виден ли элемент в области просмотра
    function checkIfInView() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;

            // Если элемент виден в области просмотра, добавляем класс appear
            if (elementBottom > windowTop && elementTop < windowBottom) {
                element.classList.add('appear');
            }
        });
    }

    // Вызываем функцию при загрузке страницы и при прокрутке
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);

    // Изменение стиля навигации при прокрутке
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.padding = '10px 50px';
            header.style.backgroundColor = 'rgba(0, 20, 40, 0.9)';
        } else {
            header.style.padding = '20px 50px';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
    });

    // Плавная прокрутка при клике на ссылки навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Исследовать"
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', function () {
        window.scrollTo({
            top: document.querySelector('#history').offsetTop - 80,
            behavior: 'smooth'
        });
    });

    // Модальное окно для героев космоса
    const heroCards = document.querySelectorAll('.hero-card');
    const modal = document.getElementById('hero-modal');
    const heroDetails = document.getElementById('hero-details');
    const closeBtn = document.querySelector('.close-btn');

    // Данные о героях космоса
    const heroesData = {
        'Юрий Гагарин': {
            fullName: 'Юрий Алексеевич Гагарин',
            birthDate: '9 марта 1934',
            deathDate: '27 марта 1968',
            bio: 'Советский лётчик-космонавт, первый человек, совершивший полёт в космическое пространство. 12 апреля 1961 года Гагарин совершил полёт на космическом корабле «Восток-1», став первым человеком в мировой истории, совершившим полёт в космос. Он облетел земной шар за 108 минут и благополучно вернулся на Землю.',
            achievements: ['Первый человек в космосе', 'Герой Советского Союза', 'Кавалер высших знаков отличия ряда государств']
        },
        'Сергей Королёв': {
            fullName: 'Сергей Павлович Королёв',
            birthDate: '12 января 1907',
            deathDate: '14 января 1966',
            bio: 'Советский учёный, конструктор и организатор производства ракетно-космической техники и ракетного оружия СССР, основоположник практической космонавтики. Под его руководством были созданы первые советские баллистические ракеты, первые искусственные спутники Земли, осуществлены первые полёты человека в космос.',
            achievements: ['Главный конструктор первых ракет-носителей и пилотируемых космических кораблей', 'Дважды Герой Социалистического Труда', 'Академик АН СССР']
        },
        'Валентина Терешкова': {
            fullName: 'Валентина Владимировна Терешкова',
            birthDate: '6 марта 1937',
            deathDate: 'Жива',
            bio: 'Советский космонавт, первая в мире женщина-космонавт. 16 июня 1963 года Терешкова совершила полёт на космическом корабле «Восток-6», став первой в мире женщиной-космонавтом. Она провела в космосе почти трое суток и совершила 48 оборотов вокруг Земли.',
            achievements: ['Первая женщина в космосе', 'Герой Советского Союза', 'Генерал-майор авиации']
        },
        'Алексей Леонов': {
            fullName: 'Алексей Архипович Леонов',
            birthDate: '30 мая 1934',
            deathDate: '11 октября 2019',
            bio: 'Советский космонавт, первый человек, вышедший в открытый космос. 18 марта 1965 года Леонов совершил первый в истории человечества выход в открытый космос, который продлился 12 минут и 9 секунд. Во время выхода он удалился от корабля на расстояние до 5 метров.',
            achievements: ['Первый человек, вышедший в открытый космос', 'Дважды Герой Советского Союза', 'Лауреат Государственной премии СССР']
        }
    };

    // Открытие модального окна при клике на карточку героя
    heroCards.forEach(card => {
        card.addEventListener('click', function () {
            const heroName = this.getAttribute('data-name');
            const hero = heroesData[heroName];

            if (hero) {
                let achievementsHTML = '';
                hero.achievements.forEach(achievement => {
                    achievementsHTML += `<li>${achievement}</li>`;
                });

                heroDetails.innerHTML = `
                    <h2>${hero.fullName}</h2>
                    <p><strong>Дата рождения:</strong> ${hero.birthDate}</p>
                    <p><strong>Дата смерти:</strong> ${hero.deathDate}</p>
                    <p>${hero.bio}</p>
                    <h3>Достижения:</h3>
                    <ul>${achievementsHTML}</ul>
                `;

                modal.style.display = 'block';
            }
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Интерактивная карта космодромов
    const launchMap = document.getElementById('launch-map');
    const cosmodromeInfo = document.getElementById('cosmodrome-info');

    // Установка фонового изображения карты России
    launchMap.style.backgroundImage = "url('https://klev.club/uploads/posts/2023-10/1697620476_klev-club-p-risunki-karta-rossiiskoi-federatsii-5.jpg')";
    launchMap.style.backgroundSize = "contain";
    launchMap.style.backgroundPosition = "center";
    launchMap.style.backgroundRepeat = "no-repeat";

    // Данные о космодромах
    const cosmodromes = {
        'baikonur': {
            name: 'Байконур',
            location: { top: '79%', left: '20%'},
            info: 'Космодром Байконур — первый и крупнейший в мире космодром. Расположен в Казахстане. С Байконура был осуществлен запуск первого искусственного спутника Земли и первого космонавта планеты Юрия Гагарина.',
            image: 'https://avatars.mds.yandex.net/get-altay/1909414/2a0000016b8c649618b9eaf7c71bd1e19d22/XXXL'
        },
        'plesetsk': {
            name: 'Плесецк',
            location: { top: '40%', left: '15%' },
            info: 'Космодром Плесецк — российский космодром, расположенный в Архангельской области. Первоначально создавался как первая отечественная ракетная база с межконтинентальными баллистическими ракетами.',
            image: 'https://teplosfera.ru/userfls/photo/large/929_3-plesetsk.jpg'
        },
        'vostochny': {
            name: 'Восточный',
            location: { top: '62%', left: '77%' },
            info: 'Космодром Восточный — российский космодром на Дальнем Востоке в Амурской области. Первый запуск с космодрома состоялся 28 апреля 2016 года.',
            image: 'https://www.roscosmos.ru/media/img/foto/vostocnii-117.jpg'
        }
    };



    // Создание точек космодромов на карте
    for (const id in cosmodromes) {
        const cosmodrome = cosmodromes[id];
        const point = document.createElement('div');
        point.className = 'launch-point';
        point.style.top = cosmodrome.location.top;
        point.style.left = cosmodrome.location.left;
        point.setAttribute('data-id', id);

        point.addEventListener('click', function () {
            showCosmodromeInfo(id);
        });

        launchMap.appendChild(point);
    }

    // Отображение информации о космодроме
    function showCosmodromeInfo(id) {
        const cosmodrome = cosmodromes[id];
        cosmodromeInfo.innerHTML = `
        <h4>${cosmodrome.name}</h4>
        <div class="cosmodrome-image" style="background-image: url('${cosmodrome.image}')"></div>
        <p>${cosmodrome.info}</p>
    `;
    }

    // Клик по элементам списка космодромов
    document.querySelectorAll('.cosmodromes li').forEach(item => {
        item.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            showCosmodromeInfo(id);
        });
    });

    // Викторина о космосе
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const resultsElement = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

    // Вопросы для викторины
    const questions = [
        {
            question: 'Кто был первым человеком в космосе?',
            options: ['Юрий Гагарин', 'Нил Армстронг', 'Алексей Леонов', 'Валентина Терешкова'],
            correctAnswer: 'Юрий Гагарин'
        },
        {
            question: 'В каком году был запущен первый искусственный спутник Земли?',
            options: ['1957', '1961', '1969', '1975'],
            correctAnswer: '1957'
        },
        {
            question: 'Кто был главным конструктором первых советских космических кораблей?',
            options: ['Сергей Королёв', 'Константин Циолковский', 'Валентин Глушко', 'Михаил Янгель'],
            correctAnswer: 'Сергей Королёв'
        },
        {
            question: 'Как назывался космический корабль, на котором Юрий Гагарин совершил полёт в космос?',
            options: ['Восток-1', 'Союз', 'Аполлон', 'Буран'],
            correctAnswer: 'Восток-1'
        },
        {
            question: 'Кто был первой женщиной-космонавтом?',
            options: ['Валентина Терешкова', 'Светлана Савицкая', 'Елена Кондакова', 'Салли Райд'],
            correctAnswer: 'Валентина Терешкова'
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // Функция для отображения текущего вопроса
    function showQuestion() {
        answered = false;
        const currentQuestion = questions[currentQuestionIndex];

        questionElement.textContent = currentQuestion.question;

        optionsElement.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(option));
            optionsElement.appendChild(optionElement);
        });

        nextButton.disabled = true;
        nextButton.style.opacity = '0.5';
    }

    // Функция для выбора варианта ответа
    function selectOption(selectedOption) {
        if (answered) return;

        answered = true;
        const currentQuestion = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');

        options.forEach(option => {
            if (option.textContent === selectedOption) {
                option.classList.add('selected');

                if (selectedOption === currentQuestion.correctAnswer) {
                    option.classList.add('correct');
                    score++;
                } else {
                    option.classList.add('incorrect');
                }
            } else if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
        });

        nextButton.disabled = false;
        nextButton.style.opacity = '1';
    }

    // Функция для перехода к следующему вопросу
    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    // Функция для отображения результатов
    function showResults() {
        quizContainer.style.display = 'none';
        resultsElement.style.display = 'block';
        scoreElement.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов!`;
    }

    // Функция для перезапуска викторины
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.style.display = 'block';
        resultsElement.style.display = 'none';
        showQuestion();
    }

    // Обработчики событий для кнопок
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // Запуск викторины
    showQuestion();

    // Анимация галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '1';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '0';
        });

        // Увеличение изображения при клике
        item.addEventListener('click', function () {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'block';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function () {
                document.body.removeChild(modal);
            });

            const img = document.createElement('div');
            img.style.width = '100%';
            img.style.height = '500px';
            img.style.backgroundImage = this.style.backgroundImage;
            img.style.backgroundSize = 'contain';
            img.style.backgroundPosition = 'center';
            img.style.backgroundRepeat = 'no-repeat';

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(img);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            modal.addEventListener('click', function (event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Добавление эффекта параллакса для фона
    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.stars').style.transform = `translateY(${scrollPosition * 0.1}px)`;
        document.querySelector('.twinkling').style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });

    // Анимация для кнопки "Исследовать"
    const exploreButton = document.querySelector('.explore-btn');
    exploreButton.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });

    exploreButton.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });

    // Добавление эффекта свечения для заголовков при наведении
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach(heading => {
        heading.addEventListener('mouseenter', function () {
            this.style.textShadow = '0 0 20px rgba(0, 180, 255, 0.8)';
        });

        heading.addEventListener('mouseleave', function () {
            if (this.tagName === 'H2') {
                this.style.textShadow = '0 0 10px rgba(0, 180, 255, 0.5)';
            } else {
                this.style.textShadow = 'none';
            }
        });
    });

    // Добавление анимации для достижений
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.achievement-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.achievement-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Добавление эффекта для временной шкалы
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(0, 40, 80, 0.7)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'rgba(0, 20, 40, 0.7)';
        });
    });
});
