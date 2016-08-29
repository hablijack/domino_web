var Domino = (function() {

    var aniRing1Delay = null;
    var aniRing2Delay = null;
    var aniRing3Delay = null;

    var hotmode = false;

    var animateJuryText = function() {
        $('.juryTextValue').typed({
            strings: ['DOMINO'],
            typeSpeed: 50,
            showCursor: false
        });
    };

    var hideWelcomeRings = function() {
        var audioEnv = new AudioEnv('#audio-container1');
        audioEnv.play('sounds/servo_motor.mp3');
        $(".welcomeRing3").transition({
            scale: '.85714285714'
        }, 750, function() {
            audioEnv.play('sounds/servo_motor.mp3');
            $(".welcomeRing2").transition({
                scale: '.66666666667'
            }, 750, function() {});
            $(".welcomeRing3").transition({
                scale: '.57142857142'
            }, 750, function() {
                audioEnv.play('sounds/servo_motor.mp3');
                $(".welcomeRing3").transition({
                    scale: '.15714285714'
                }, 750, function() {});
                $(".welcomeRing2").transition({
                    scale: '.18333333333'
                }, 750, function() {});
                $(".welcomeRing1").transition({
                    scale: '.275'
                }, 750, function() {
                    $(".welcomeRings").transition({
                        opacity: 0
                    }, 750, function() {
                        animateBGRings();
                        showFooter();
                        initClock();
                        updateFooterGraph();
                    });
                });
            });
        });
    };

    var animateBGRings = function() {
        setTimeout(function() {
            var audioEnv1 = new AudioEnv('#audio-container1');
            audioEnv1.play('sounds/multimedia_rollover_048.mp3');
            $(".bgAnimRing3").css({
                'opacity': '1'
            });
            animateRing3();
        }, 1000);
        setTimeout(function() {
            var audioEnv2 = new AudioEnv('#audio-container2');
            audioEnv2.play('sounds/multimedia_rollover_048.mp3');
            $(".bgAnimRing2").css({
                'opacity': '1'
            });
            animateRing2();
        }, 2000);
        setTimeout(function() {
            var audioEnv3 = new AudioEnv('#audio-container3');
            audioEnv3.play('sounds/multimedia_rollover_048.mp3');
            $(".bgAnimRing1").css({
                'opacity': '1'
            });
            animateRing1();
        }, 3000);
    };

    var animateRing3 = function() {
        $(".bgAnimRing3").css({
            rotate: '-360deg'
        });
        $(".bgAnimRing3").transition({
            rotate: '360deg'
        }, 30000, 'linear', function() {
            animateRing3();
        });
    };

    var animateRing2 = function() {
        $(".bgAnimRing2").css({
            rotate: '360deg'
        });
        $(".bgAnimRing2").transition({
            rotate: '-360deg'
        }, 22000, 'linear', function() {
            animateRing2();
        });
    };

    var animateRing1 = function() {
        $(".bgAnimRing1").css({
            rotate: '-360deg'
        });
        $(".bgAnimRing1").transition({
            rotate: '360deg'
        }, 40000, 'linear', function() {
            animateRing1();
        });
    };

    var updateFooterGraph = function() {
        $(".footerGraphUnit").each(function(i, e) {
            var that = this;
            setTimeout(function() {
                $(that).transition({
                    opacity: '1'
                }, 300, function() {});
            }, 200 * i);
        });

        setTimeout(function() {
            $($(".footerGraphUnit").get().reverse()).each(function(i, e) {
                var that = this;
                if (that != $(".footerGraphUnit")[0]) {
                    setTimeout(function() {
                        $(that).transition({
                            opacity: '0'
                        }, 800, function() {});
                    }, 50 * i);
                }
            });
        }, 2000);
    };

    var initClock = function() {
        setInterval('Domino.updateClock()', 1000);
        $('.typed-cursor').show();
    };

    var unlockApp = function() {
        $(".lockIcon").css({
            'background-image': 'url(images/unlock.png)'
        });
        setTimeout(function() {
            var audioEnv1 = new AudioEnv('#audio-container1');
            audioEnv1.play('sounds/tranzistor_nav.mp3');
            $(".welcomeRing1").css({
                'background-image': 'url(images/welcomeRing1G.png)'
            });
        }, 500);
        setTimeout(function() {
            var audioEnv2 = new AudioEnv('#audio-container2');
            audioEnv2.play('sounds/tranzistor_nav.mp3');
            $(".welcomeRing2").css({
                'background-image': 'url(images/welcomeRing2G.png)'
            });

        }, 1000);
        setTimeout(function() {
            var audioEnv3 = new AudioEnv('#audio-container3');
            audioEnv3.play('sounds/tranzistor_nav.mp3');
            $(".welcomeRing3").css({
                'background-image': 'url(images/welcomeRing3G.png)'
            });
            $(".welcomeRing3").stop(true, true);
            $(".welcomeRing2").stop(true, true);
            $(".welcomeRing1").stop(true, true);
            clearInterval(aniRing1Delay);
            clearInterval(aniRing2Delay);
            clearInterval(aniRing3Delay);
            hideWelcomeRings();
        }, 1500);
    };

    var showWelcomeRings = function() {
        var aniRing1 = new RingAnimator('.welcomeRing1');
        aniRing1.animate(40000, '-360deg');
        aniRing1Delay = setInterval(function() {
            aniRing1.animate(40000, '-360deg');
        }, 40000);

        var aniRing2 = new RingAnimator('.welcomeRing2');
        aniRing2.animate(20000, '360deg');
        aniRing2Delay = setInterval(function() {
            aniRing2.animate(20000, '360deg');
        }, 20000);

        var aniRing3 = new RingAnimator('.welcomeRing3');
        aniRing3.animate(25000, '-360deg');
        aniRing3Delay = setInterval(function() {
            aniRing3.animate(25000, '-360deg');
        }, 25000);
    };

    var showFooter = function() {
        $(".footerImg").fadeIn('slow');
    };

    return {
        init: function() {
            showWelcomeRings();

            TTS.talk('Startsequenz eingeleitet');

            SocketModule.init();

            setTimeout(function() {
                unlockApp();
            }, 7000);

            setTimeout(function() {
                animateJuryText();
            }, 15000);
        },

        keywordFound: function() {
            var audioEnv1 = new AudioEnv('#audio-container1');
            audioEnv1.play('sounds/gui_beep.mp3');
            updateFooterGraph();
            $('.recognitionVisualization').show();
        },

        executeCommand: function(command) {
            $('.recognitionVisualization').hide();
            DominoCommands.execute(command);
        },

        footerGraphAnimation: function() {
            updateFooterGraph();
        },

        updateClock: function() {
            $('.clock').html(moment().locale('de').format('LLLL'));
        }
    };
})();
