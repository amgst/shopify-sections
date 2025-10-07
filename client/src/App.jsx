import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Browse from "@/pages/browse";
import SectionDetail from "@/pages/section-detail";
import NotFound from "@/pages/not-found";
function Router() {
    return (<Switch>
      <Route path="/" component={Home}/>
      <Route path="/browse" component={Browse}/>
      <Route path="/section/:slug" component={SectionDetail}/>
      <Route component={NotFound}/>
    </Switch>);
}
function App() {
    return (<QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>);
}
export default App;
