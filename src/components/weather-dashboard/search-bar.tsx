import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { useGetSuggestions } from "../../hooks/search/useGetSuggestions";
import { Input } from "../ui/input";
import { weatherActions } from "../../redux/sclices/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { suggestionsActions } from "../../redux/sclices/suggestionsSlice";

interface Suggestion {
  id: number;
  name: string;
  region: string;
  country: string;
}

interface SuggestionListProps {
  
}

const SearchBar: React.FC<SuggestionListProps> = ({

}) => {
  const { data: suggestionsList = [], loading } = useGetSuggestions();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const suggestionQuery = useAppSelector((state : any)=>state.suggestions.suggestionsQuery)
  const dispatch = useAppDispatch();


  React.useEffect(() => {
    if (suggestionQuery?.trim() === "") {
      setOpen(false);
    } else if (suggestionsList?.length > 0) {
      setOpen(true);
    }
  }, [suggestionQuery, suggestionsList]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-[200px]">
          <Input
            value={suggestionQuery}
            onChange={(e) => dispatch(suggestionsActions.setSuggestionsQuery(e.target.value))}
            placeholder="Enter city name"
            className="h-9"
            autoFocus
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {loading ? (
          <div className="p-2 text-sm text-gray-500">Loading...</div>
        ) : (
          <Command>
            <CommandList>
              <CommandEmpty>No cities found.</CommandEmpty>
              <CommandGroup>
                {suggestionsList?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      dispatch(weatherActions.setSearchQuery(item.name));
                      setValue(item.name);
                      setOpen(false);
                    }}
                  >
                    {item.name}, {item.region}, {item.country}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
