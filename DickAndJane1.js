var story = window.GlobalStory;
story.Init = function () {
    story.Name = "Dick and Jane Need Milk";
    story.Characters["Dick"] = new Character("Dick");
    story.Characters["jane"] = new Character("Jane");
    story.Characters["thug"] = new Character("Thug");
    var scStart = story.AddScene(Scene.CreateScene("Dick and Jane ran out of milk and decide to walk to the store. Dick suggests a long, boring route. Jane knows a shortcut."));
    var scLongRoute = story.AddScene(Scene.CreateScene("Dick and Jane take the long route to the store. Along the way they fight visciously about politics."));
    var scShortcut = story.AddScene(Scene.CreateScene("Jane drags Dick through a maze of alleyways. On the ground, they find a rubber chicken and a loaded hand gun."));
    var scMugger = story.AddScene(Scene.CreateFunctionScene(function () {
        var result = "As Dick and Jane rounded the corner, the ran into a thug.";
        if (story.Characters["Dick"].Items.indexOf("gun") >= 0) {
            result += " Upon seeing Dicks gleaming hand cannon, the thug runs away. The End.";
        }
        else if (story.Characters["Dick"].Items.indexOf("rubberchicken") >= 0) {
            result += " Thinking fast, Dick throws the rubber chicken right in the thug's face. Dick and Jane take his moment of confusion to run away. The End.";
        }
        else {
            result += " The thug looks at the unarmed fools and stabs them to death for $3.82. The End.";
        }
        return result;
    }));
    var scStore = story.AddScene(Scene.CreateFunctionScene(function () {
        if (story.SceneHistory.indexOf(scMugger) >= 0) {
            return "Dick and Jane bought their milk. Oh what an adventure. The End";
        }
        else {
            return "Dick and Jane bought their milk. What a boring story. The End";
        }
    }));
    scStart.AddOption(StoryOption.Create("Take the long, boring route.", scLongRoute));
    scStart.AddOption(StoryOption.Create("Take the shortcut.", scShortcut));
    scLongRoute.AddOption(StoryOption.Create("Continue", scStore));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the rubber chicken", scMugger, function () { story.Characters["Dick"].Items.push("rubberchicken"); }));
    scShortcut.AddOption(StoryOption.Create("Dick picks up the gun", scMugger, function () { story.Characters["Dick"].Items.push("gun"); }));
    scShortcut.AddOption(StoryOption.Create("Continue walking", scMugger));
};
story.Start();
//# sourceMappingURL=DickAndJane1.js.map