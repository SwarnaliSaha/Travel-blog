import "./Filter.css";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export default function Filters({facets,handleFiltering}) {
  const [appliedFilters, setAppliedFilters] = useState([]);

  function onSelectionUpdate(selectedItem) {
    const index = appliedFilters.findIndex(
      (item) => item.facetId === selectedItem.facetId
    );

    if (index === -1) {
      setAppliedFilters([
        ...appliedFilters,
        {
          facetId: selectedItem.facetId,
          selections: [selectedItem.filter],
        },
      ]);
    } 
    else {
      const currentSelections = appliedFilters[index].selections;
      const isSelected = currentSelections.find(
        (filter) => filter.id === selectedItem.filter.id
      );

      if (isSelected) {
        const updatedSelections = currentSelections.filter(
          (filter) => filter.id !== selectedItem.filter.id
        );
        setAppliedFilters((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, selections: updatedSelections } : item
          )
        );
      } else {
        setAppliedFilters((prev) =>
          prev.map((item, i) =>
            i === index
              ? {
                  ...item,
                  selections: [...currentSelections, selectedItem.filter],
                }
              : item
          )
        );
      }
    }

    handleFiltering(appliedFilters)
  }

  function clearSelections(facetId) {
    setAppliedFilters((prev) => {
      return prev.filter((filter) => filter.facetId !== facetId);
    });
  }
  return (
    <div className="facets-main-container">
        <Card className="facets-container" variant="outlined">
      {facets.map((facet) => {
        return (
          <Card key={facet.id} className="facet--card" variant="unstyled">
            <CardHeader title={facet.label} className="facet--label" />
            <CardContent className="facet--content">
              {!facet.multiSelect && (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {facet.filters.map((item) => {
                    return (
                      <FormControlLabel
                        value={item.id}
                        control={
                          <Radio
                            checked={
                              appliedFilters
                                .find((filter) => filter.facetId === facet.id)
                                ?.selections.some((f) => f.id === item.id) ||
                              false
                            }
                          />
                        }
                        label={item.label}
                        onChange={() =>
                          onSelectionUpdate({ facetId: facet.id, filter: item })
                        }
                        key={item.id}
                      />
                    );
                  })}
                </RadioGroup>
              )}
              {facet.multiSelect && (
                <FormGroup>
                  {facet.filters.map((item) => {
                    return (
                      <FormControlLabel
                        value={item.id}
                        control={
                          <Checkbox
                            checked={
                              appliedFilters
                                .find((filter) => filter.facetId === facet.id)
                                ?.selections.some((f) => f.id === item.id) ||
                              false
                            }
                          />
                        }
                        label={item.label}
                        onChange={() =>
                          onSelectionUpdate({ facetId: facet.id, filter: item })
                        }
                        key={item.id}
                      />
                    );
                  })}
                </FormGroup>
              )}
            </CardContent>
            <div className="facet--actions">
              <Button variant="text" color="warning">
                Show More
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() => clearSelections(facet.id)}
              >
                Clear
              </Button>
            </div>
          </Card>
        );
      })}
    </Card>
    <div className="all-facets--action">
        <Button variant="contained" color="warning">
          Reset
        </Button>
        <Button
          variant="contained"
          color="warning"
        >
          Apply
        </Button>
      </div>
    </div>
    
  );
}
